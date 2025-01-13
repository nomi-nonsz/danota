import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { ClientUser } from "@/types/prisma";
import { collectionSchema } from "@/schemas/note-schema";

export const PATCH = authMiddleware(
  async (req, {
    params: {
      id
    },
    currentUser
  }: {
    params: {
      id: string
    },
    currentUser: ClientUser
  }) => {
    const body = await req.json();
    const validate = collectionSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json({
        message: validate.error.message
      }, {
        status: 400
      })
    }

    const { name, description } = body as typeof collectionSchema._type;

    const collection = await prisma.collection.update({
      where: {
        id,
        userId: currentUser.id
      },
      data: {
        name, description
      }
    });

    return NextResponse.json({
      message: "Note updated",
      data: collection
    }, {
      status: 200
    });
})

export const DELETE = authMiddleware(
  async (_, {
    params: {
      id
    },
    currentUser
  }: {
    params: {
      id: string
    },
    currentUser: ClientUser
  }) => {
    const collection = await prisma.collection.delete({
      where: {
        id,
        userId: currentUser.id
      }
    });

    return NextResponse.json({
      message: "Collection deleted",
      data: collection
    }, {
      status: 200
    });
})