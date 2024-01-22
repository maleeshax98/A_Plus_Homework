import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/admin/dashboard"] };

export async function middleware(request) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.redirect("https://homeworkreport.vercel.app/");
  }
}
