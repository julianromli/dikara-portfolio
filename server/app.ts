import './env';
import {Hono} from 'hono';
import {trpcServer} from '@hono/trpc-server';
import {createRouteHandler} from 'uploadthing/server';
import {getDb} from '../db';
import {appRouter} from './trpc/router';
import {uploadRouter} from './uploadthing';

const uploadHandlers = createRouteHandler({
  router: uploadRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});

export const app = new Hono();

app.get('/health', (c) => c.json({ok: true}));

app.all('/api/uploadthing', (c) => uploadHandlers(c.req.raw));
app.all('/api/uploadthing/*', (c) => uploadHandlers(c.req.raw));

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
