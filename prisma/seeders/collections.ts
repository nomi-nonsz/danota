import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function exec() {
  console.log("Seeding collections...");
  await prisma.collection.createMany({
    data: Array(15).fill("").map(() => ({
      userId: 'cm6stgxoj0000optnqe1cuc0y',
      name: faker.lorem.sentence({ min: 3, max: 7 })
    }))
  });
  console.log("Complete seeding collections...");
}

exec();