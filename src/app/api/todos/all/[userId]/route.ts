import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: params.userId,
    },
    include: {
      user: true,
    },
    orderBy: [
      {
        completed: "asc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return Response.json(todos);
}
