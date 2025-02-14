export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/api-middleware";

import { ClientUser } from "@/types/prisma";
import { ExportType } from "@/types/enums";
import { DocumentFormatter } from "@/lib/document-formatter";

export const GET = authMiddleware(
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
    const { searchParams } = req.nextUrl;
    const filename = searchParams.get('filename');
    const formatType = searchParams.get('type');

    if (!filename) return NextResponse.json({ message: `Filename required` }, { status: 400 });

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
        userId: currentUser.id
      }
    });

    if (!note) return new NextResponse('Not found', { status: 404 });

    const formatter = new DocumentFormatter(note.content, filename);
    let doc: Buffer | null = null;
    let mimeType = null;

    switch (formatType) {
      case ExportType.PDF:
        // Start PDF format
        doc = await formatter.pdf();
        mimeType = "application/pdf";
        break;
      case ExportType.DOCX:
        // start DOCX format
        doc = await formatter.docx();
        mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case ExportType.HTML:
        // start DOCX format
        doc = await formatter.html();
        mimeType = "text/html; charset=utf-8";
        break;
      default:
        return NextResponse.json({ message: `Invalid ${formatType} format` }, { status: 400 })
    }

    return new NextResponse(doc, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}.${formatType}"`,
        "Content-Length": doc.length.toString()
      },
    });
})