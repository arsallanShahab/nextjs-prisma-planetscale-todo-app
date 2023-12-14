import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const body = await request.json();

  const todos = await prisma.todo.update({
    where: {
      id: params.todoId,
    },
    data: {
      completed: body.completed,
    },
  });

  return Response.json(todos);
}
