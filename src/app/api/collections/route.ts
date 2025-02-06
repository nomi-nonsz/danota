import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";
import { collectionSchema } from "@/schemas/note-schema";
import { ClientUser } from "@/types/prisma";

export const GET = authMiddleware(
  async (req: NextRequest, { currentUser }: { currentUser: ClientUser }) => {
    const { searchParams } = req.nextUrl;

    const page = parseInt(searchParams.get('page') ?? '0');
    const query = searchParams.get('q');

    const collections = await prisma.collection.findMany({
      where: {
        userId: currentUser.id,
        name: {
          contains: query ?? undefined
        }
      },
      take: 10,
      skip: page,
      include: {
        notes: {
          select: {
            id: true
          }
        }
      }
    });

    return NextResponse.json({
      data: collections
    }, {
      status: 200
    });
})

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