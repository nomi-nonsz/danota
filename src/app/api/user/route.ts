import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { verifyCsrf } from "@/lib/csrf";
import { signupSchema } from "@/schemas/auth-schema";

import bcrypt from "bcryptjs";

export async function POST (req: NextRequest) {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const validate = signupSchema.safeParse(body);

  if (currentUser)
    return NextResponse.json(
      { message: "You already Login, You are not permitted creating a new account" },
      { status: 403 }
    );

  if (!validate.success)
    return NextResponse.json(
      { message: "Signup failed" },
      { status: 401 }
    );

  const {
    csrfToken,
    displayName,
    image,
    email,
    password,
    username
  } = body as typeof signupSchema._type;


  if (!verifyCsrf(csrfToken))
    return NextResponse.json(
      { message: "csrf not valid" },
      { status: 419 }
    );

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (user)
    return NextResponse.json(
      { message: "Signup failed" },
      { status: 401 }
    );

  const hash = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    select: {
      username: true,
      email: true,
      image: true
    },
    data: {
      username,
      name: displayName,
      email,
      image,
      hash,
    }
  })

  return NextResponse.json({ message: "Account created", data: newUser }, { status: 201 });
}