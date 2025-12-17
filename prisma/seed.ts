import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CAPTION_TEMPLATES = [
  "오늘의 기록 📸",
  "바람이 좋다 🌿",
  "그냥 좋았던 순간",
  "빛이 예뻤던 날",
  "잠깐 멈춰서 보기",
  "여행 중 🧳",
  "산책하다가 👣",
  "무심코 찍었는데 마음에 듦",
  "평범한 하루의 특별함",
  "조용히, 천천히",
  "말 대신 사진",
  "이 계절 좋아",
  "분위기 한 스푼",
  "기억용",
  "필름 감성 흉내 🎞️",
  "구름이 예뻐서 ☁️",
  "나중에 보면 웃을 사진",
  "색감 맛집",
  "오늘도 수고했어",
  "여기 꽤 괜찮네",
];

function makeCaption(id: number) {
  // 반복 실행해도 매번 동일하게(원하면 랜덤으로 바꿔도 됨)
  const base = CAPTION_TEMPLATES[id % CAPTION_TEMPLATES.length];
  // 가끔은 캡션 없는 포스트도 섞기
  if (id % 7 === 0) return null;
  return base;
}

async function main() {
  const photos = await prisma.photo.findMany({
    where: { caption: { startsWith: "seed:" } },
    select: { id: true },
  });

  const chunkSize = 100;
  for (let i = 0; i < photos.length; i += chunkSize) {
    const chunk = photos.slice(i, i + chunkSize);

    await prisma.$transaction(
      chunk.map((p) =>
        prisma.photo.update({
          where: { id: p.id },
          data: { caption: makeCaption(p.id) },
        })
      )
    );

    console.log(
      `updated ${Math.min(i + chunkSize, photos.length)}/${photos.length}`
    );
  }

  console.log(`✅ Done. updated=${photos.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
