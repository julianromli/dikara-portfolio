import 'dotenv/config';
import {getDb} from '../db';
import {projects} from '../db/schema';
import {studioGridItems} from '../src/data/portfolio';

async function main() {
  const db = getDb();
  const existing = await db.select({id: projects.id}).from(projects).limit(1);
  if (existing.length > 0) {
    console.log('projects table already has rows; skip seed');
    return;
  }

  const now = new Date();
  await db.insert(projects).values(
    studioGridItems.map((item, i) => ({
      title: item.title,
      imageUrl: item.img,
      category: item.cat,
      sortOrder: i,
      createdAt: now,
      updatedAt: now,
    })),
  );

  console.log(`seeded ${studioGridItems.length} projects`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
