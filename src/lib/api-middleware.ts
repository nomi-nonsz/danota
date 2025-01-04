import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./auth";
import prisma from "./prisma";

type handlerType = (request: NextRequest, context?: any) => Promise<Response> |  Promise<NextResponse>;

export function withMiddleware (handler: handlerType, middlewares: Function[]) {
  return async function (req: NextRequest, context?: any) {
    for (const middleware of middlewares) {
      const result = await middleware(req);
      if (result) {
        return result;
      }
    }
    await handler(req, context);
  };
}

/**
 * Used for simple authentication
 * 
 * @param handler 
 * @returns 
 */
export function authMiddleware (handler: handlerType) {
  return async (request: NextRequest, context?: any) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        message: "You have no access to use the API"
      }, { status: 401 });
    }
    return handler(request, { ...context, currentUser });
  }
}