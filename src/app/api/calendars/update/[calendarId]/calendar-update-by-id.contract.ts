import { ErrorSchema } from "@/src/rest/error.schema";
import { initContract } from "@ts-rest/core";

import { z } from "zod";
import { CalendarUpdateOkaySchema } from "../calendar-update.schema";

const c = initContract();

export const CalendarUpdateByIdContract = c.router({
  "import-calendar-by-id": {
    method: "GET",
    path: "/api/calendar/import/:calendarId",
    pathParams: z.object({
      calendarId: z.string(),
    }),
    responses: {
      200: CalendarUpdateOkaySchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary:
      "Triggers update of all changed events of one specific calendar by its id.",
  },
});
