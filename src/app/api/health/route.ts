// next js app router GET api route handler

import { createNextHandler } from "@ts-rest/serverless/next";
import { HealthContract } from "./health.contract";
import packageJson from "../../../../package.json" assert { type: "json" };
import { getCalendarApiHealth } from "@/src/api-clients/calendar-api/calendar-api.health";
import {
  HealthyApiStatusSchema,
  ServiceStatusSchema,
  UnhealthyApiStatusSchema,
} from "@/src/rest/health.schema";
import { getEventsApiHealth } from "@/src/api-clients/events-api/events-api.health";

const handler = createNextHandler(
  HealthContract,
  {
    health: async () => {
      const calenderApiHealth: ServiceStatusSchema =
        await getCalendarApiHealth();

      const eventsApiHealth: ServiceStatusSchema = await getEventsApiHealth();

      // evaluate overall status code
      let status: number = 200;
      if (calenderApiHealth.status !== 200 || eventsApiHealth.status !== 200) {
        status = 503;
      }

      if (status === 200) {
        const apiStatus: HealthyApiStatusSchema = {
          status: status,
          version: packageJson.version,
          name: packageJson.name,
          description: packageJson.description,
          services: [calenderApiHealth, eventsApiHealth],
        };
        return { status: 200, body: apiStatus };
      }

      const apiStatus: UnhealthyApiStatusSchema = {
        status: 503,
        error:
          "error" in calenderApiHealth
            ? calenderApiHealth.error
            : "Unknown error",
        version: packageJson.version,
        name: packageJson.name,
        description: packageJson.description,
        services: [calenderApiHealth, eventsApiHealth],
      };
      return { status: 503, body: apiStatus };
    },
  },

  {
    handlerType: "app-router",
  }
);

export { handler as GET };
