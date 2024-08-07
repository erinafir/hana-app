import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifToken } from "./db/helper/jwt";

export async function middleware(request: NextRequest) {
  const authorization: { value: string } | undefined =
    cookies().get("Authorization");
  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (!authorization?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    if (!authorization?.value) {
      return Response.json(
        {
          err: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const [Bearer, token] = authorization.value.split(" ");

    if (Bearer !== "Bearer") {
      return Response.json(
        {
          err: "Invalid token",
        },
        { status: 401 }
      );
    }
    const decoded = await verifToken<{
      _id: string;
      email: string;
      username: string;
    }>(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-email", decoded.email);
    requestHeaders.set("x-id", decoded._id);
    requestHeaders.set("x-username", decoded.username);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }
}

export const config = {
  matcher: ["/api/wishlist/:path", "/wishlist"],
};
