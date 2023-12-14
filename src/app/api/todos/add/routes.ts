import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Body {
  title: string;
  userId: string;
}

export async function POST(request: Request) {
  const body: Body = await request.json();

  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      user: {
        connect: {
          id: body.userId,
        },
      },
    },
  });

  return Response.json(todo);
}
