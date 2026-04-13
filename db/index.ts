import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import {drizzle} from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

export type DB = ReturnType<typeof createDrizzle>;

function resolveDbPath(): string {
  const raw = process.env.SQLITE_PATH?.trim();
  if (raw) {
    return path.isAbsolute(raw) ? raw : path.join(process.cwd(), raw);
  }
  return path.join(process.cwd(), 'data', 'app.db');
}

function ensureParentDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }
}

function createDrizzle() {
  const dbPath = resolveDbPath();
  ensureParentDir(dbPath);
  const sqlite = new Database(dbPath);
  return drizzle(sqlite, {schema});
}

let cached: DB | undefined;

export function getDb(): DB {
  if (!cached) {
    cached = createDrizzle();
  }
  return cached;
}
