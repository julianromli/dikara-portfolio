import {createTRPCRouter} from './init';
import {projectRouter} from './routers/project';
import {heroRouter} from './routers/hero';

export const appRouter = createTRPCRouter({
  project: projectRouter,
  hero: heroRouter,
});

export type AppRouter = typeof appRouter;
