import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  for (let i = 0; i < 100; i++) {
    await client.comment.create({
      data: {
        payload:
          i % 2 === 0
            ? `Comment ${i}`
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eius a molestiae consequatur nisi deserunt quam nesciunt sit enim dolorum non explicabo amet omnis perferendis, nostrum quia, eveniet illo? Autem?",
        author: {
          connect: {
            id: i % 2 === 0 ? 3 : 4,
          },
        },
        photo: {
          connect: {
            id: 117,
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
