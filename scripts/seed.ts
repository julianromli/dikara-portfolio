import 'dotenv/config';
import {getDb} from '../db';
import {projects, heroPortraits} from '../db/schema';
import {studioGridItems, heroPortraits as initialHeroPortraits} from '../src/data/portfolio';

async function main() {
  const db = getDb();
  
  const now = new Date();

  // Seed projects
  const existingProjects = await db.select({id: projects.id}).from(projects).limit(1);
  if (existingProjects.length > 0) {
    console.log('projects table already has rows; skip seed');
  } else {
    await db.insert(projects).values(
      studioGridItems.map((item, i) => ({
        title: item.title,
        imageUrl: item.img,
        description: item.cat,
        category: item.cat,
        sortOrder: i,
        createdAt: now,
        updatedAt: now,
      })),
    );
    console.log(`seeded ${studioGridItems.length} projects`);
  }

  // Seed hero portraits
  const existingHero = await db.select({id: heroPortraits.id}).from(heroPortraits).limit(1);
  if (existingHero.length > 0) {
    console.log('hero_portraits table already has rows; skip seed');
  } else {
    await db.insert(heroPortraits).values(
      initialHeroPortraits.map((item, i) => ({
        alt: item.alt,
        imageUrl: item.img,
        hoverImageUrl: item.hoverImg,
        sortOrder: i,
        createdAt: now,
        updatedAt: now,
      }))
    );
    console.log(`seeded ${initialHeroPortraits.length} hero portraits`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
