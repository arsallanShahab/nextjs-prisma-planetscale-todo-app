import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;
  const todo = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return Response.json(todo);
}
