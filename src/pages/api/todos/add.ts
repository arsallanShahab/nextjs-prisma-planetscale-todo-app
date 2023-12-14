import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({
      success: false,
      message: "You must be logged in.",
    });
    return;
  }

  const todos = await prisma.todo.create({
    data: {
      title: body.title,
      userId: session.user.id,
    },
  });
  return res.status(200).json(todos);
}
