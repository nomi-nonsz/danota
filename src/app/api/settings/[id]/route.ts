import { authMiddleware } from "@/lib/api-middleware";
import prisma from "@/lib/prisma";
import type { ClientUser, EditablePreferences } from "@/types/prisma";
import { NextResponse } from "next/server";

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
    const { autoSave, darkMode, toolbarPosition, expandSidebar } = body as EditablePreferences;

    try {
      const setting = await prisma.setting.update({
        where: {
          id,
          userId: currentUser.id
        },
        data: { autoSave, darkMode, toolbarPosition, expandSidebar }
      });

      return NextResponse.json({
        message: "Note updated",
        data: setting
      }, {
        status: 200
      });
    }
    catch (error) {
      console.error(error);

      return NextResponse.json({
        message: "Bad Request",
      }, {
        status: 400
      });
    }
})