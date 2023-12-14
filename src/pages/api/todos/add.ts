import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface Todo {
  title: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
