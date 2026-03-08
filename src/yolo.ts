import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export interface YoloState {
  expiresAt: string | null; // ISO timestamp, or null for full session
  activatedAt: string;
  bypassDeny?: boolean;
}

function yoloFilePath(sessionId: string): string {
  return join(tmpdir(), `claude-warden-yolo-${sessionId}`);
}

export function getYoloState(sessionId: string): YoloState | null {
  const filePath = yoloFilePath(sessionId);
  if (!existsSync(filePath)) return null;

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const state: YoloState = JSON.parse(raw);

    // Check expiry
    if (state.expiresAt && new Date(state.expiresAt) <= new Date()) {
      // Expired — clean up
      try { unlinkSync(filePath); } catch {}
      return null;
    }

    return state;
  } catch {
    return null;
  }
}

export function activateYolo(sessionId: string, durationMinutes: number | null, bypassDeny = false): YoloState {
  const now = new Date();
  const state: YoloState = {
    activatedAt: now.toISOString(),
    expiresAt: durationMinutes ? new Date(now.getTime() + durationMinutes * 60_000).toISOString() : null,
    bypassDeny,
  };
  writeFileSync(yoloFilePath(sessionId), JSON.stringify(state), 'utf-8');
  return state;
}

export interface YoloCommand {
  action: 'activate' | 'deactivate' | 'status';
  durationMinutes: number | null;
}

const YOLO_PATTERN = /^echo\s+__WARDEN_YOLO_(ACTIVATE|DEACTIVATE|STATUS)__(?::(\w+))?$/;

export function parseYoloCommand(command: string): YoloCommand | null {
  const match = command.trim().match(YOLO_PATTERN);
  if (!match) return null;

  const action = match[1].toLowerCase() as YoloCommand['action'];
  const param = match[2] || null;

  if (action === 'activate') {
    let durationMinutes: number | null = null;
    if (param && param !== 'session') {
      const m = param.match(/^(\d+)m?$/);
      if (m) {
        durationMinutes = parseInt(m[1], 10);
      } else {
        return null; // invalid duration
      }
    }
    return { action, durationMinutes };
  }

  return { action, durationMinutes: null };
}

export function deactivateYolo(sessionId: string): boolean {
  const filePath = yoloFilePath(sessionId);
  if (!existsSync(filePath)) return false;
  try {
    unlinkSync(filePath);
    return true;
  } catch {
    return false;
  }
}
