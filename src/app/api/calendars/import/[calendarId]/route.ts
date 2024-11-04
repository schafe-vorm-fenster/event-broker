import { createNextHandler } from "@ts-rest/serverless/next";
import { CalendarImportByIdContract } from "./calendar-import-by-id.contract";
import { ErrorSchema } from "@/src/rest/error.schema";
import {
  CalendarImportEmptySchema,
  CalendarImportNotModifiedSchema,
  CalendarImportSuccessfulSchema,
} from "../calendar-import.schema";

const handler = createNextHandler(
  CalendarImportByIdContract,
  {
    "import-calendar-by-id": async ({ params, query }) => {
      // get calendarId from path parameter
      const calendarId: string | undefined = params.calendarId;

      // get from and to from query parameter
      const from: string | undefined = query?.from;
      const to: string | undefined = query?.to;

      // TODO: mock not found response
      if (calendarId === "unknown@import.calendar.google.com") {
        return {
          status: 404,
          body: {
            status: 404,
            error: "Not Found",
            message: "Calendar not found.",
          } as ErrorSchema,
        };
      }

      // TODO: mock empty calendar
      if (
        calendarId ===
        "c_46994e65f2a4d424f41dcd72cbbdf9c8d01cedb2d4ca4eb850d24b6f5de32289@group.calendar.google.com"
      ) {
        return {
          status: 200,
          body: {
            status: 204,
            results: 0,
            timestamp: "2024-12-31T23:59:59.999Z",
          } as CalendarImportEmptySchema,
        };
      }

      // TODO: mock not modified response
      if (
        calendarId ===
        "0fc2sup8usvqp7520n0krkn0ipdmmf0o@import.calendar.google.com"
      ) {
        return {
          status: 200,
          body: {
            status: 304,
            results: 0,
            timestamp: "2024-12-31T23:59:59.999Z",
          } as CalendarImportNotModifiedSchema,
        };
      }

      // TODO: mock successful response with from or to
      if (
        calendarId ===
          "fs5r0j9thgru6jto0d3pnnemo49pd36l@import.calendar.google.com" &&
        (from || to)
      ) {
        return {
          status: 200,
          body: {
            status: 200,
            calendarId: calendarId,
            results: 51,
            timestamp: "2024-12-31T23:59:59.999Z",
            from: from,
            to: to,
          } as CalendarImportSuccessfulSchema,
        };
      }

      // TODO: mock successful response without parameters
      if (
        calendarId ===
        "fs5r0j9thgru6jto0d3pnnemo49pd36l@import.calendar.google.com"
      ) {
        return {
          status: 200,
          body: {
            status: 200,
            calendarId: calendarId,
            results: 89,
            timestamp: "2024-12-31T23:59:59.999Z",
          } as CalendarImportSuccessfulSchema,
        };
      }

      // Return a default error response if no conditions are met
      return {
        status: 500,
        body: {
          status: 500,
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        } as ErrorSchema,
      };
    },
  },
  {
    handlerType: "app-router",
  }
);

export { handler as GET };
