import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { noteSchema } from "@/schemas/note-schema";
import { ClientUser } from "@/types/prisma";

export const POST = authMiddleware(
  async (req, { currentUser }: { currentUser: ClientUser }) => {
    const body = await req.json();

    const validate = noteSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json({
        message: validate.error.message
      }, {
        status: 400
      })
    }

    const { title, categoryId, isPublic, allowComment } = body as typeof noteSchema._type;

    const note = await prisma.note.create({
      select: {
        id: true,
        title: true,
        userId: true,
      },
      data: {
        userId: currentUser.id,
        title,
        categoryId,
        content: "",
        allowComment,
        isPublic
      }
    });

    return NextResponse.json({
      message: "New note created",
      data: note
    }, {
      status: 201
    });
})