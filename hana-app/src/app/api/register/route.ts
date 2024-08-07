import User from "@/db/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body: {
      name: string;
      username: string;
      email: string;
      password: string;
    } = await request.json();
    const userEmail = await User.getUserByEmail(body.email);
    if (userEmail) {
      return NextResponse.json(
        {
          message: "Email already registered",
        },
        { status: 400 }
      );
    }
    const userUsername = await User.getUserByUsername(body.username);
    if (userUsername) {
      return NextResponse.json(
        {
          message: "Email already registered",
        },
        { status: 400 }
      );
    }
    await User.create({
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json(
      {
        message: "Register Success!",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;
      return NextResponse.json(
        {
          message: `${errPath} ${errMessage.toLocaleLowerCase()}`,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
