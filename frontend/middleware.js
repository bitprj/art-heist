import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default withClerkMiddleware((req) => {
  return NextResponse.next();
});

// Stop Middleware running on static file
export const config = { matcher: '/((?!.*\\.).*)' }