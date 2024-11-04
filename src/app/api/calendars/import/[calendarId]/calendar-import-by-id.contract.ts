import { ErrorSchema } from "@/src/rest/error.schema";
import { initContract } from "@ts-rest/core";

import { CalendarImportOkaySchema } from "../calendar-import.schema";
import { z } from "zod";

const c = initContract();

export const CalendarImportByIdContract = c.router({
  "import-calendar-by-id": {
    method: "GET",
    path: "/api/calendars/import/:calendarId",
    pathParams: z.object({
      calendarId: z.string(),
    }),
    query: z.object({
      from: z
        .string()
        .transform((val) => new Date(val).toISOString())
        .optional(),
      to: z
        .string()
        .transform((val) => new Date(val).toISOString())
        .optional(),
    }),
    responses: {
      200: CalendarImportOkaySchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary:
      "Triggers import of all events of one specific calendar by its id.",
  },
});
