import posthog from "posthog-js";

export const ANALYTICS_EVENTS = {
  LEAD_SUBMITTED: "lead_submitted",
  CONSULT_CTA_CLICK: "consult_cta_click",
  PORTFOLIO_EXPAND: "portfolio_expand",
  CHAT_OPENED: "chat_opened",
} as const;

type EventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function trackEvent(
  event: EventName,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}
