import {asc, eq} from 'drizzle-orm';
import {z} from 'zod';
import {heroPortraits} from '../../../db/schema';
import {createTRPCRouter, publicProcedure} from '../init';

const heroPortraitInput = z.object({
  alt: z.string().min(1),
  imageUrl: z.string().min(1),
  hoverImageUrl: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const heroRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ctx}) => {
    const rows = await ctx.db
      .select()
      .from(heroPortraits)
      .orderBy(asc(heroPortraits.sortOrder), asc(heroPortraits.id));
    return rows;
  }),

  create: publicProcedure.input(heroPortraitInput).mutation(async ({ctx, input}) => {
    const now = new Date();
    const [row] = await ctx.db
      .insert(heroPortraits)
      .values({
        alt: input.alt,
        imageUrl: input.imageUrl,
        hoverImageUrl: input.hoverImageUrl,
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
        data: heroPortraitInput.partial(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const now = new Date();
      const {data} = input;
      const [row] = await ctx.db
        .update(heroPortraits)
        .set({
          ...(data.alt !== undefined ? {alt: data.alt} : {}),
          ...(data.imageUrl !== undefined ? {imageUrl: data.imageUrl} : {}),
          ...(data.hoverImageUrl !== undefined ? {hoverImageUrl: data.hoverImageUrl} : {}),
          ...(data.sortOrder !== undefined ? {sortOrder: data.sortOrder} : {}),
          updatedAt: now,
        })
        .where(eq(heroPortraits.id, input.id))
        .returning();
      return row ?? null;
    }),

  delete: publicProcedure
    .input(z.object({id: z.number().int().positive()}))
    .mutation(async ({ctx, input}) => {
      const [row] = await ctx.db.delete(heroPortraits).where(eq(heroPortraits.id, input.id)).returning();
      return row ?? null;
    }),
});
