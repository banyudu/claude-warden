import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, unlinkSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { getYoloState, activateYolo, deactivateYolo, parseYoloCommand } from '../yolo';

const TEST_SESSION = 'test-session-yolo-123';

function yoloFile() {
  return join(tmpdir(), `claude-warden-yolo-${TEST_SESSION}`);
}

function cleanup() {
  try { unlinkSync(yoloFile()); } catch {}
}

describe('yolo', () => {
  beforeEach(cleanup);
  afterEach(cleanup);

  describe('getYoloState', () => {
    it('returns null when no state file exists', () => {
      expect(getYoloState(TEST_SESSION)).toBeNull();
    });

    it('returns state for active full-session YOLO', () => {
      activateYolo(TEST_SESSION, null);
      const state = getYoloState(TEST_SESSION);
      expect(state).not.toBeNull();
      expect(state!.expiresAt).toBeNull();
      expect(state!.activatedAt).toBeTruthy();
    });

    it('returns state for active time-limited YOLO', () => {
      activateYolo(TEST_SESSION, 15);
      const state = getYoloState(TEST_SESSION);
      expect(state).not.toBeNull();
      expect(state!.expiresAt).toBeTruthy();
      const expiry = new Date(state!.expiresAt!);
      expect(expiry.getTime()).toBeGreaterThan(Date.now());
    });

    it('returns null and cleans up for expired YOLO', () => {
      activateYolo(TEST_SESSION, -1); // already expired
      const state = getYoloState(TEST_SESSION);
      expect(state).toBeNull();
      expect(existsSync(yoloFile())).toBe(false);
    });

    it('returns null for corrupted state file', () => {
      const { writeFileSync } = require('fs');
      writeFileSync(yoloFile(), 'not json', 'utf-8');
      expect(getYoloState(TEST_SESSION)).toBeNull();
    });
  });

  describe('activateYolo', () => {
    it('creates state file for full session', () => {
      const state = activateYolo(TEST_SESSION, null);
      expect(state.expiresAt).toBeNull();
      expect(existsSync(yoloFile())).toBe(true);

      const raw = JSON.parse(readFileSync(yoloFile(), 'utf-8'));
      expect(raw.expiresAt).toBeNull();
    });

    it('creates state file with expiry for time-limited', () => {
      const state = activateYolo(TEST_SESSION, 5);
      expect(state.expiresAt).toBeTruthy();
      const expiry = new Date(state.expiresAt!);
      const expectedMin = Date.now() + 4 * 60_000;
      const expectedMax = Date.now() + 6 * 60_000;
      expect(expiry.getTime()).toBeGreaterThan(expectedMin);
      expect(expiry.getTime()).toBeLessThan(expectedMax);
    });

    it('supports bypassDeny flag', () => {
      const state = activateYolo(TEST_SESSION, null, true);
      expect(state.bypassDeny).toBe(true);
    });

    it('overwrites existing state', () => {
      activateYolo(TEST_SESSION, 5);
      activateYolo(TEST_SESSION, null);
      const state = getYoloState(TEST_SESSION);
      expect(state!.expiresAt).toBeNull();
    });
  });

  describe('deactivateYolo', () => {
    it('removes state file and returns true', () => {
      activateYolo(TEST_SESSION, null);
      expect(deactivateYolo(TEST_SESSION)).toBe(true);
      expect(existsSync(yoloFile())).toBe(false);
    });

    it('returns false when no state file exists', () => {
      expect(deactivateYolo(TEST_SESSION)).toBe(false);
    });
  });

  describe('parseYoloCommand', () => {
    it('parses full session activation', () => {
      const cmd = parseYoloCommand('echo __WARDEN_YOLO_ACTIVATE__:session');
      expect(cmd).toEqual({ action: 'activate', durationMinutes: null });
    });

    it('parses time-limited activation with m suffix', () => {
      const cmd = parseYoloCommand('echo __WARDEN_YOLO_ACTIVATE__:5m');
      expect(cmd).toEqual({ action: 'activate', durationMinutes: 5 });
    });

    it('parses time-limited activation without m suffix', () => {
      const cmd = parseYoloCommand('echo __WARDEN_YOLO_ACTIVATE__:15');
      expect(cmd).toEqual({ action: 'activate', durationMinutes: 15 });
    });

    it('parses deactivation', () => {
      const cmd = parseYoloCommand('echo __WARDEN_YOLO_DEACTIVATE__');
      expect(cmd).toEqual({ action: 'deactivate', durationMinutes: null });
    });

    it('parses status check', () => {
      const cmd = parseYoloCommand('echo __WARDEN_YOLO_STATUS__');
      expect(cmd).toEqual({ action: 'status', durationMinutes: null });
    });

    it('returns null for non-yolo commands', () => {
      expect(parseYoloCommand('echo hello')).toBeNull();
      expect(parseYoloCommand('ls -la')).toBeNull();
      expect(parseYoloCommand('npm test')).toBeNull();
    });

    it('returns null for invalid duration', () => {
      expect(parseYoloCommand('echo __WARDEN_YOLO_ACTIVATE__:abc')).toBeNull();
    });

    it('handles extra whitespace', () => {
      const cmd = parseYoloCommand('  echo __WARDEN_YOLO_ACTIVATE__:session  ');
      expect(cmd).toEqual({ action: 'activate', durationMinutes: null });
    });

    it('parses activation without parameter as full session', () => {
      const cmd = parseYoloCommand('echo __WARDEN_YOLO_ACTIVATE__');
      expect(cmd).toEqual({ action: 'activate', durationMinutes: null });
    });
  });
});
