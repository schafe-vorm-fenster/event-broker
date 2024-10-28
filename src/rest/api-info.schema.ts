import { z } from "zod";

export const ApiInfoSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string().optional(),
});
