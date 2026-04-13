import {createTRPCRouter} from './init';
import {projectRouter} from './routers/project';

export const appRouter = createTRPCRouter({
  project: projectRouter,
});

export type AppRouter = typeof appRouter;
