import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")
  if (
    ["/dashboard", "/dashboard/", "/dashboard/profile", "/dashboard/water-tracker", "/dashboard/health", "/ai-chatbot"].some(path =>
      request.nextUrl.pathname.startsWith(path)
    )
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/ai-chatbot/:path*"],
}