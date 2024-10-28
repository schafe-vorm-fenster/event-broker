import { z } from "zod";

export const ErrorSchema = z.object({
  status: z.number().min(500).max(599),
  error: z.string(),
  trace: z.any().optional(),
});
