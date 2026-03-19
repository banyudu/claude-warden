/** Convert a glob pattern to a RegExp. Supports *, ?, [...], and {a,b,c}. */
export function globToRegex(pattern: string): RegExp {
  let regex = '';
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === '*') {
      regex += '.*';
    } else if (ch === '?') {
      regex += '.';
    } else if (ch === '[') {
      i++;
      if (i < pattern.length && pattern[i] === '!') {
        regex += '[^';
        i++;
      } else {
        regex += '[';
      }
      while (i < pattern.length && pattern[i] !== ']') {
        regex += pattern[i];
        i++;
      }
      if (i < pattern.length) regex += ']';
    } else if (ch === '{') {
      const end = pattern.indexOf('}', i);
      if (end !== -1) {
        const alternatives = pattern.slice(i + 1, end).split(',').map(s => s.replace(/[.+^$|\\()]/g, '\\$&'));
        regex += `(${alternatives.join('|')})`;
        i = end;
      } else {
        regex += '\\{';
      }
    } else if ('.+^$|\\()'.includes(ch)) {
      regex += '\\' + ch;
    } else {
      regex += ch;
    }
    i++;
  }
  return new RegExp(`^${regex}$`);
}
