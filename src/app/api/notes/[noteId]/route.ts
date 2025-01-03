import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { ClientUser } from "@/types/prisma";
import { z } from "zod";

const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  isPublic: z.boolean(),
  content: z.string()
});

export const PATCH = authMiddleware(
  async (req, {
    params: {
      noteId
    },
    currentUser
  }: {
    params: {
      noteId: string
    },
    currentUser: ClientUser
  }) => {
    const body = await req.json();

    const validate = noteSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json({
        message: validate.error.message
      }, {
        status: 400
      })
    }

    const { title, content, isPublic } = body as typeof noteSchema._type;

    const note = await prisma.note.update({
      where: {
        id: noteId,
        userId: currentUser.id
      },
      data: {
        title, content, isPublic
      }
    });

    return NextResponse.json({
      message: "Note updated",
      data: note
    }, {
      status: 201
    });
})