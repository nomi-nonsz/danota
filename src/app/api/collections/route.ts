import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { collectionSchema } from "@/schemas/note-schema";
import { ClientUser } from "@/types/prisma";

export const POST = authMiddleware(
  async (req, { currentUser }: { currentUser: ClientUser }) => {
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

    const collection = await prisma.collection.create({
      select: {
        id: true,
        name: true,
      },
      data: {
        userId: currentUser.id,
        name,
        description
      }
    });

    return NextResponse.json({
      message: "New collection created",
      data: collection
    }, {
      status: 201
    });
})