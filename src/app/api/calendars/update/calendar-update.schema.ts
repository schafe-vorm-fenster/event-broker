import {
  CalendarActionEmptySchema,
  CalendarActionNotModifiedSchema,
  CalendarActionSuccessfulSchema,
} from "../calendar-action.schema";

export const CalendarUpdateSuccessfulSchema = CalendarActionSuccessfulSchema;

export const CalendarUpdateEmptySchema = CalendarActionEmptySchema;

export const CalendarUpdateNotModifiedSchema = CalendarActionNotModifiedSchema;

export const CalendarUpdateOkaySchema = CalendarActionSuccessfulSchema.or(
  CalendarActionEmptySchema
).or(CalendarActionNotModifiedSchema);
