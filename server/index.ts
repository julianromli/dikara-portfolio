import './env';
import {serve} from '@hono/node-server';
import {app} from './app';

const port = Number(process.env.PORT) || 3001;

serve(
  {
    fetch: app.fetch,
    port,
    hostname: '127.0.0.1',
  },
  (info) => {
    console.log(`API http://127.0.0.1:${info.port} (tRPC /trpc, GET /health)`);
  },
);
