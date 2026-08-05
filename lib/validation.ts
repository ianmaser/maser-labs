import { z } from "zod/v4";

export const heroLeadSchema = z.object({
  email: z.email(),
  project_idea: z.string().optional(),
  source: z.literal("hero_hook"),
});

export const fullLeadSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  business_name: z.string().optional(),
  business_type: z.string().optional(),
  service_interest: z.enum([
    "Website",
    "App",
    "AI Automation",
    "Dashboard",
    "SEO",
    "Not sure",
  ]),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  project_details: z.string().optional(),
  source: z.literal("bottom_form"),
});

export type HeroLead = z.infer<typeof heroLeadSchema>;
export type FullLead = z.infer<typeof fullLeadSchema>;
