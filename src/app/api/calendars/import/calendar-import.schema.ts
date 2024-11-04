import { z } from "zod";
import {
  CalendarActionEmptySchema,
  CalendarActionNotModifiedSchema,
  CalendarActionSuccessfulSchema,
} from "../calendar-action.schema";

export const CalendarImportSuccessfulSchema =
  CalendarActionSuccessfulSchema.extend({
    from: z
      .string()
      .transform((val) => new Date(val).toISOString())
      .optional(),
    to: z
      .string()
      .transform((val) => new Date(val).toISOString())
      .optional(),
  });

export type CalendarImportSuccessfulSchema = z.infer<
  typeof CalendarImportSuccessfulSchema
>;

export const CalendarImportEmptySchema = CalendarActionEmptySchema;

export type CalendarImportEmptySchema = z.infer<
  typeof CalendarImportEmptySchema
>;

export const CalendarImportNotModifiedSchema = CalendarActionNotModifiedSchema;

export type CalendarImportNotModifiedSchema = z.infer<
  typeof CalendarImportNotModifiedSchema
>;

export const CalendarImportOkaySchema = CalendarActionSuccessfulSchema.or(
  CalendarActionEmptySchema
).or(CalendarActionNotModifiedSchema);

export type CalendarImportOkaySchema = z.infer<typeof CalendarImportOkaySchema>;
