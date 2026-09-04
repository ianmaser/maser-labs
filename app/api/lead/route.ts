import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { leadSchema } from "@/lib/validation";
import type { HeroLead, FullLead } from "@/lib/validation";

function buildLeadRow(
  data: HeroLead | FullLead,
  meta: Record<string, unknown>,
): Record<string, unknown> {
  if (data.source === "hero_hook") {
    return {
      source: data.source,
      email: data.email,
      project_details: data.project_idea ?? null,
      raw_meta: meta,
    };
  }

  return {
    source: data.source,
    name: data.name,
    email: data.email,
    business_name: data.business_name ?? null,
    business_type: data.business_type ?? null,
    service_interest: data.service_interest ?? null,
    budget_range: data.budget_range ?? null,
    timeline: data.timeline ?? null,
    project_details: data.project_details ?? null,
    raw_meta: meta,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  // Validate
  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        details: result.error.issues,
      },
      { status: 400 },
    );
  }

  const data = result.data;

  // Capture metadata
  const meta: Record<string, unknown> = {
    referrer: request.headers.get("referer") ?? null,
    userAgent: request.headers.get("user-agent") ?? null,
  };

  // Insert into Supabase
  const row = buildLeadRow(data, meta);
  const { error: dbError } = await supabaseAdmin.from("leads").insert(row);

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json(
      { success: false, error: "Failed to save lead" },
      { status: 500 },
    );
  }

  // Email notification (Resend) — stub until API key is configured
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Maser Labs <leads@maserlabs.ai>",
          to: "ianmaserdev@gmail.com",
          subject: `New lead: ${data.email}${data.source === "bottom_form" ? ` / ${data.service_interest ?? "unspecified"}` : ""}`,
          html: `<h2>New ${data.source === "hero_hook" ? "Hero Hook" : "Contact Form"} Lead</h2>
<p><strong>Email:</strong> ${data.email}</p>
${
  data.source === "bottom_form"
    ? `<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Business:</strong> ${data.business_name ?? "—"} (${data.business_type ?? "—"})</p>
<p><strong>Service:</strong> ${data.service_interest ?? "—"}</p>
<p><strong>Budget:</strong> ${data.budget_range ?? "—"}</p>
<p><strong>Timeline:</strong> ${data.timeline ?? "—"}</p>
<p><strong>Details:</strong> ${data.project_details ?? "—"}</p>`
    : `<p><strong>Idea:</strong> ${data.project_idea ?? "—"}</p>`
}
<hr><p style="color:#999">Source: ${data.source}</p>`,
        }),
      });
    } catch (emailError) {
      // Log but don't fail the request — the lead is already saved
      console.error("Resend email error:", emailError);
    }
  }

  return NextResponse.json({ success: true });
}
