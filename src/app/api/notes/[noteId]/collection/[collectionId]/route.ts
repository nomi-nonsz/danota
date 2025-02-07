import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { ClientUser } from "@/types/prisma";

export const DELETE = authMiddleware(
  async (req, {
    params: {
      noteId,
      collectionId
    },
    currentUser
  }: {
    params: {
      noteId: string,
      collectionId: string
    },
    currentUser: ClientUser
  }) => {
    await prisma.note.update({
      where: {
        id: noteId,
        userId: currentUser.id,
        collections: {
          some: {
            id: collectionId
          }
        }
      },
      data: {
        collections: {
          disconnect: {
            id: collectionId
          }
        }
      }
    });

    return NextResponse.json({
      message: "Removed note from the collection"
    }, {
      status: 200
    });
})