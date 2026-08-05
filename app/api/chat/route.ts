import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  // v1.5: Claude API integration, streaming response
  return NextResponse.json(
    { message: "Chat endpoint stub — available in v1.5" },
    { status: 501 }
  );
}
