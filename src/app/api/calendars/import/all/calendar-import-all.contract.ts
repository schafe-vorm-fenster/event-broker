import { ErrorSchema } from "@/src/rest/error.schema";
import { initContract } from "@ts-rest/core";

import {
  CalendarImportEmptySchema,
  CalendarImportNotModifiedSchema,
  CalendarImportSuccessfulSchema,
} from "../calendar-import.schema";

const c = initContract();

export const CalendarImportAllContract = c.router({
  "import-calendar-all": {
    method: "GET",
    path: "/api/calendar/import/all",
    responses: {
      201: CalendarImportSuccessfulSchema,
      204: CalendarImportEmptySchema,
      304: CalendarImportNotModifiedSchema,
      500: ErrorSchema,
    },
    summary: "Triggers import of all events of all calendars.",
  },
});
