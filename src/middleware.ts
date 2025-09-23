import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Redirect /admin to /admin/login if not authenticated
    if (req.nextUrl.pathname === "/admin" && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    // Redirect authenticated users from login page to admin dashboard
    if (req.nextUrl.pathname === "/admin/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    // Check if user has admin/editor role for admin pages
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token) {
      const userRole = req.nextauth.token.role as string
      if (!["ADMIN", "EDITOR"].includes(userRole)) {
        return NextResponse.redirect(new URL("/admin/login", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }

        // Require token for admin pages
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token
        }

        // Allow all other pages
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}