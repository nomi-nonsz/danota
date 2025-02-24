import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { ClientUser } from "@/types/prisma";
import { z } from "zod";

const schema = z.object({
  collectionIds: z.array(z.string())
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

    const { collectionIds } = body as typeof schema._type;

    const foundedNotes = await prisma.collection.findMany({
      where: {
        id: { in: collectionIds }
      }
    });

    if (foundedNotes.length !== collectionIds.length) {
      if (!validate.success) {
        return NextResponse.json({
          message: "The given collection id was not found"
        }, {
          status: 400
        })
      }
    }

    // disconnect all
    await prisma.note.update({
      where: {
        id: noteId,
        userId: currentUser.id
      },
      data: {
        collections: { set: [] }
      }
    });

    // then connect it again lol
    await prisma.note.update({
      where: {
        id: noteId,
        userId: currentUser.id
      },
      data: {
        collections: {
          connect: collectionIds.map(id => ({ id }))
        }
      }
    });

    return NextResponse.json({
      message: "Note updated"
    }, {
      status: 200
    });
})