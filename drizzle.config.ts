import path from 'node:path';
import {defineConfig} from 'drizzle-kit';

const sqlitePath = process.env.SQLITE_PATH?.trim() ?? path.join('data', 'app.db');

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: sqlitePath.startsWith('file:') ? sqlitePath : `file:${sqlitePath}`,
  },
});
