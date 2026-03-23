import { describe, it, expect } from 'vitest';
import { evaluate } from '../evaluator';
import { parseCommand } from '../parser';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig, PathPolicy, DatabasePolicy, EndpointPolicy } from '../types';

function evalWith(cmd: string, overrides: Partial<WardenConfig>, cwd: string = '/home/user/project') {
  const config: WardenConfig = { ...structuredClone(DEFAULT_CONFIG), ...overrides };
  return evaluate(parseCommand(cmd), config, cwd);
}

// Helpers to build targetPolicies from shorthand
function pathPolicies(paths: Omit<PathPolicy, 'type'>[]): { targetPolicies: PathPolicy[] } {
  return { targetPolicies: paths.map(p => ({ ...p, type: 'path' as const })) };
}

function dbPolicies(dbs: Omit<DatabasePolicy, 'type'>[]): { targetPolicies: DatabasePolicy[] } {
  return { targetPolicies: dbs.map(d => ({ ...d, type: 'database' as const })) };
}

function endpointPolicies(eps: Omit<EndpointPolicy, 'type'>[]): { targetPolicies: EndpointPolicy[] } {
  return { targetPolicies: eps.map(e => ({ ...e, type: 'endpoint' as const })) };
}

describe('targetPolicies — path', () => {
  it('allows rm -rf /tmp/build when /tmp is trusted recursive', () => {
    const result = evalWith('rm -rf /tmp/build', pathPolicies([{ path: '/tmp', recursive: true, decision: 'allow' }]));
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedPaths');
  });

  it('does NOT allow rm -rf /tmp/../../etc (path traversal)', () => {
    const result = evalWith('rm -rf /tmp/../../etc', pathPolicies([{ path: '/tmp', recursive: true, decision: 'allow' }]));
    expect(result.decision).not.toBe('allow');
  });

  it('allows rm file.txt when {{cwd}} matches trusted path', () => {
    const result = evalWith('rm file.txt', pathPolicies([{ path: '{{cwd}}', recursive: true, decision: 'allow' }]), '/home/user/project');
    expect(result.decision).toBe('allow');
  });

  it('denies chmod 777 /etc/passwd when /etc has deny target', () => {
    const result = evalWith('chmod 777 /etc/passwd', pathPolicies([{ path: '/etc', recursive: true, decision: 'deny' }]));
    expect(result.decision).toBe('deny');
    expect(result.details[0]?.matchedRule).toBe('trustedPaths');
  });

  it('filters by command list: cp allowed but curl not affected', () => {
    const policies = pathPolicies([{ path: '/tmp', recursive: true, decision: 'allow', commands: ['cp', 'rm'] }]);
    const cpResult = evalWith('cp /tmp/file /dest', policies);
    expect(cpResult.decision).toBe('allow');

    // curl /tmp/file — curl is not in commands list, so targetPolicies doesn't apply
    const curlResult = evalWith('curl /tmp/file', policies);
    expect(curlResult.details[0]?.matchedRule).not.toBe('trustedPaths');
  });

  it('deny takes precedence over allow with multiple targets', () => {
    const result = evalWith('rm /shared/file.txt', {
      targetPolicies: [
        { type: 'path', path: '/shared', recursive: true, decision: 'allow' },
        { type: 'path', path: '/shared', recursive: true, decision: 'deny' },
      ],
    });
    expect(result.decision).toBe('deny');
  });

  it('non-recursive path matches exact only', () => {
    const result = evalWith('rm /tmp/build/file.txt', pathPolicies([{ path: '/tmp/build', recursive: false, decision: 'allow' }]));
    // /tmp/build/file.txt is NOT /tmp/build exactly
    expect(result.details[0]?.matchedRule).not.toBe('trustedPaths');
  });

  it('non-recursive path matches exact file', () => {
    const result = evalWith('rm /tmp/build', pathPolicies([{ path: '/tmp/build', recursive: false, decision: 'allow' }]));
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedPaths');
  });

  it('allowAll bypasses command filter and PATH_COMMANDS gate', () => {
    // cat is in alwaysAllow so use a command that goes through rules
    // Use a custom config without alwaysAllow to test allowAll properly
    const config: WardenConfig = {
      ...structuredClone(DEFAULT_CONFIG),
      layers: [{ alwaysAllow: [], alwaysDeny: [], rules: [] }],
      targetPolicies: [{ type: 'path', path: '/tmp', recursive: true, decision: 'deny', allowAll: true }],
    };
    const result = evaluate(parseCommand('somecommand /tmp/file'), config, '/home/user/project');
    // allowAll overrides decision to 'allow'
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedPaths');
  });
});

describe('targetPolicies — database', () => {
  it('allows psql -h localhost -d testdb when localhost/testdb trusted', () => {
    const result = evalWith('psql -h localhost -d testdb', dbPolicies([{ host: 'localhost', database: 'testdb', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedDatabases');
  });

  it('does not match psql -h prod.example.com -d main (not trusted)', () => {
    const result = evalWith('psql -h prod.example.com -d main', dbPolicies([{ host: 'localhost', decision: 'allow' }]));
    expect(result.details[0]?.matchedRule).not.toBe('trustedDatabases');
  });

  it('allows mysql --host=localhost --database=testdb', () => {
    const result = evalWith('mysql --host=localhost --database=testdb', dbPolicies([{ host: 'localhost', database: 'testdb', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedDatabases');
  });

  it('allows psql postgresql://localhost/testdb', () => {
    const result = evalWith('psql postgresql://localhost/testdb', dbPolicies([{ host: 'localhost', database: 'testdb', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedDatabases');
  });

  it('supports glob pattern for host', () => {
    const result = evalWith('psql -h dev-db-01.internal -d myapp', dbPolicies([{ host: 'dev-*.internal', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
  });

  it('supports glob pattern for database', () => {
    const result = evalWith('psql -h localhost -d test_myapp', dbPolicies([{ host: 'localhost', database: 'test_*', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
  });

  it('filters by port when specified', () => {
    const result = evalWith('psql -h localhost -p 5433 -d testdb', dbPolicies([{ host: 'localhost', port: 5432, database: 'testdb', decision: 'allow' }]));
    // Port mismatch — trustedDatabases should not match
    expect(result.details[0]?.matchedRule).not.toBe('trustedDatabases');
  });

  it('does not match when target specifies database but command does not', () => {
    const result = evalWith('psql -h localhost', dbPolicies([{ host: 'localhost', database: 'testdb', decision: 'allow' }]));
    // target requires database=testdb but command has no -d flag → should NOT match
    expect(result.details[0]?.matchedRule).not.toBe('trustedDatabases');
  });

  it('allows redis-cli -h localhost', () => {
    const result = evalWith('redis-cli -h localhost', dbPolicies([{ host: 'localhost', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
  });

  it('allowAll allows any DB command to matching host', () => {
    const result = evalWith('psql -h localhost -d mydb', {
      targetPolicies: [{ type: 'database', host: 'localhost', decision: 'deny', allowAll: true }],
    });
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedDatabases');
  });
});

describe('targetPolicies — endpoint', () => {
  it('allows curl http://localhost:3000/api when localhost:* trusted', () => {
    const result = evalWith('curl http://localhost:3000/api', endpointPolicies([{ pattern: 'http://localhost:*', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedEndpoints');
  });

  it('does not match curl https://api.prod.example.com/delete (not trusted)', () => {
    const result = evalWith('curl https://api.prod.example.com/delete', endpointPolicies([{ pattern: 'http://localhost:*', decision: 'allow' }]));
    expect(result.details[0]?.matchedRule).not.toBe('trustedEndpoints');
  });

  it('allows wget http://localhost:8080/file', () => {
    const result = evalWith('wget http://localhost:8080/file', endpointPolicies([{ pattern: 'http://localhost:*', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
  });

  it('handles curl --url flag', () => {
    const result = evalWith('curl --url http://localhost:3000/api -X POST', endpointPolicies([{ pattern: 'http://localhost:*', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
  });

  it('filters by command list', () => {
    const policies = endpointPolicies([{ pattern: 'http://localhost:*', decision: 'allow', commands: ['curl'] }]);
    const curlResult = evalWith('curl http://localhost:3000/api', policies);
    expect(curlResult.decision).toBe('allow');

    const wgetResult = evalWith('wget http://localhost:3000/api', policies);
    expect(wgetResult.details[0]?.matchedRule).not.toBe('trustedEndpoints');
  });

  it('supports https patterns', () => {
    const result = evalWith('curl https://api.dev.example.com/users', endpointPolicies([{ pattern: 'https://api.dev.example.com/*', decision: 'allow' }]));
    expect(result.decision).toBe('allow');
  });

  it('allowAll allows any HTTP command to matching endpoint', () => {
    const result = evalWith('curl http://localhost:3000/api', {
      targetPolicies: [{ type: 'endpoint', pattern: 'http://localhost:*', decision: 'deny', allowAll: true }],
    });
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedEndpoints');
  });
});

describe('integration with alwaysDeny', () => {
  it('alwaysDeny still blocks even with trusted path (sudo rm /tmp/file)', () => {
    const result = evalWith('sudo rm /tmp/file', pathPolicies([{ path: '/tmp', recursive: true, decision: 'allow' }]));
    expect(result.decision).toBe('deny');
  });

  it('alwaysDeny still blocks even with allowAll path', () => {
    const result = evalWith('sudo rm /tmp/file', {
      targetPolicies: [{ type: 'path', path: '/tmp', recursive: true, decision: 'allow', allowAll: true }],
    });
    expect(result.decision).toBe('deny');
  });
});

describe('target policies override command-specific rules', () => {
  it('rm -rf /tmp/build → allow despite rm -rf usually being ask', () => {
    // rm with -rf would normally trigger an ask pattern in default rules
    const result = evalWith('rm -rf /tmp/build', pathPolicies([{ path: '/tmp', recursive: true, decision: 'allow' }]));
    expect(result.decision).toBe('allow');
    expect(result.details[0]?.matchedRule).toBe('trustedPaths');
  });
});
