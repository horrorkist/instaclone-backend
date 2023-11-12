import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  for (let i = 0; i < 100; i++) {
    await client.user.create({
      data: {
        username: `user${i + 1}`,
        firstName: `user${i + 1}`,
        lastName: `user${i + 1}`,
        email: `user${i + 1}`,
        password: await bcrypt.hash("1234", 10),
        following: {
          connect: {
            username: "horrorkist",
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
