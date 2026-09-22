import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL("/admin/login", request.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.delete("ite_admin_session");
  return res;
}
