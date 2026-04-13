import {asc, eq} from 'drizzle-orm';
import {z} from 'zod';
import {projects} from '../../../db/schema';
import {createTRPCRouter, publicProcedure} from '../init';

const projectInput = z.object({
  title: z.string().min(1),
  imageUrl: z.string().min(1),
  description: z.string().default(''),
  category: z.string().default(''),
  sortOrder: z.number().int().optional(),
});

export const projectRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ctx}) => {
    const rows = await ctx.db
      .select()
      .from(projects)
      .orderBy(asc(projects.sortOrder), asc(projects.id));
    return rows;
  }),

  create: publicProcedure.input(projectInput).mutation(async ({ctx, input}) => {
    const now = new Date();
    const [row] = await ctx.db
      .insert(projects)
      .values({
        title: input.title,
        imageUrl: input.imageUrl,
        description: input.description,
        category: input.category,
        sortOrder: input.sortOrder ?? 0,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return row;
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        data: projectInput.partial(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const now = new Date();
      const {data} = input;
      const [row] = await ctx.db
        .update(projects)
        .set({
          ...(data.title !== undefined ? {title: data.title} : {}),
          ...(data.imageUrl !== undefined ? {imageUrl: data.imageUrl} : {}),
          ...(data.description !== undefined ? {description: data.description} : {}),
          ...(data.category !== undefined ? {category: data.category} : {}),
          ...(data.sortOrder !== undefined ? {sortOrder: data.sortOrder} : {}),
          updatedAt: now,
        })
        .where(eq(projects.id, input.id))
        .returning();
      return row ?? null;
    }),

  delete: publicProcedure
    .input(z.object({id: z.number().int().positive()}))
    .mutation(async ({ctx, input}) => {
      const [row] = await ctx.db.delete(projects).where(eq(projects.id, input.id)).returning();
      return row ?? null;
    }),
});
