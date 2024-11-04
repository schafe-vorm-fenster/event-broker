import { initContract } from "@ts-rest/core";
import { HealthContract } from "./health/health.contract";
import { CalendarImportByIdContract } from "./calendars/import/[calendarId]/calendar-import-by-id.contract";
import { CalendarImportAllContract } from "./calendars/import/all/calendar-import-all.contract";

const c = initContract();

export const ApiContract = c.router({
  health: HealthContract,
  "calendar-import-by-id": CalendarImportByIdContract,
  "calendar-import-all": CalendarImportAllContract,
});
