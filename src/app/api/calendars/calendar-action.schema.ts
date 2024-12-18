import { ResultSchema } from "@/src/rest/result.schema";
import { z } from "zod";
const CalendarActionResultSchema = ResultSchema.extend({
  calendarId: z.string(),
});

export const CalendarActionSuccessfulSchema = CalendarActionResultSchema.extend(
  {
    status: z.number().min(200).max(201),
    results: z.number().min(1),
    data: z.array(z.object({})),
  }
);

export const CalendarActionEmptySchema = ResultSchema.extend({
  status: z.number().min(204).max(204),
  results: z.number().max(0),
});

export const CalendarActionNotModifiedSchema = ResultSchema.extend({
  status: z.number().min(304).max(304),
  results: z.number().max(0),
});
