import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  // Phase 5: validate with zod, insert into Supabase, send email via Resend
  const body = await request.json();

  return NextResponse.json(
    { success: true, message: "Lead endpoint stub", received: body },
    { status: 200 }
  );
}
