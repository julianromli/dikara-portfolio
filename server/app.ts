import {Hono} from 'hono';
import {trpcServer} from '@hono/trpc-server';
import {getDb} from '../db';
import {appRouter} from './trpc/router';

export const app = new Hono();

app.get('/health', (c) => c.json({ok: true}));

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    endpoint: '/trpc',
    createContext: () => ({
      db: getDb(),
    }),
  }),
);
