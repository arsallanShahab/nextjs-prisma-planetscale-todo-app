import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(res: Response) {
  const user = await prisma.user.findUnique({
    where: {
      id: "668a39ed-27f3-4990-a5ce-7ad50a5048c3",
    },
  });

  return Response.json(user);
}