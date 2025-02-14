import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { ClientUser } from "@/types/prisma";

import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { z } from "zod";
import { generateShorterContent } from "@/lib/server-utils";
import { noteSchema } from "@/schemas/note-schema";

const schema = z.object({
  ...noteSchema.shape,
  content: z.string()
});

export const GET = authMiddleware(
  async (_, {
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
    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
        userId: currentUser.id
      }
    });

    if (!note) return new NextResponse('Not found', { status: 404 });

    return NextResponse.json({
      data: note
    }, {
      status: 200
    });
})

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

    const validate = schema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json({
        message: validate.error.message
      }, {
        status: 400
      })
    }

    const { window } = new JSDOM("");
    const purify = DOMPurify(window);

    const { title, content, isPublic, allowComment, categoryId } = body as typeof schema._type;
    const sanitizedContent = purify.sanitize(content);
    const shorter = generateShorterContent(sanitizedContent, 300);

    const note = await prisma.note.update({
      where: {
        id: noteId,
        userId: currentUser.id
      },
      data: {
        title,
        content: sanitizedContent,
        shorter,
        isPublic,
        allowComment,
        categoryId
      }
    });

    return NextResponse.json({
      message: "Note updated",
      data: note
    }, {
      status: 200
    });
})

export const DELETE = authMiddleware(
  async (_, {
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
    const note = await prisma.note.delete({
      where: {
        id: noteId,
        userId: currentUser.id
      }
    });

    return NextResponse.json({
      message: "Note deleted",
      data: note
    }, {
      status: 200
    });
})