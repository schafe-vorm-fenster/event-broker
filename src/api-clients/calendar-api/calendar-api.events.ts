/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { z } from "zod";

export const CalendarApiEventsQuery = z.object({
  calendarId: z.string(),
  from: z
    .string()
    .transform((value) => {
      return value ? value : new Date().toISOString();
    })
    .optional(),
  to: z
    .string()
    .transform((value) => {
      return value ? value : new Date().toISOString();
    })
    .optional(),
  updatedSince: z
    .string()
    .transform((value) => {
      return value ? value : new Date().toISOString();
    })
    .optional(),
});
export type CalendarApiEventsQuery = z.infer<typeof CalendarApiEventsQuery>;

export const getCalendarApiEvents = async (
  query: CalendarApiEventsQuery
): Promise<any> => {
  CalendarApiEventsQuery.parse(query);

  const requestUrl: URL = new URL(
    `${process.env.SVF_CALENDARAPI_BASEURL}/api/calendars/${query.calendarId}/events`
  );

  return axios
    .get(requestUrl.toString(), {
      headers: {
        "Sheep-Token": process.env.SVF_CALENDARAPI_READ_ACCESS_TOKENS,
        Accept: "application/json",
      },
      params: {
        from: query.from ?? undefined,
        to: query.to ?? undefined,
        updatedSince: query.updatedSince ?? undefined,
      },
    })
    .then((res) => {
      // TODO: type anyhow?
      const response: any = res.data;
      console.log(response);
      return [
        { id: 123, title: "test" },
        { id: 456, title: "test2" },
      ];
    })
    .catch((err) => {
      // TODO: implement error handling
      throw err;
    });
};
