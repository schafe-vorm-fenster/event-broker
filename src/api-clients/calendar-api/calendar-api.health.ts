/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HealthyServiceInfoSchema,
  ServiceStatusSchema,
  UnhealthyServiceInfoSchema,
} from "@/src/rest/health.schema";
import axios from "axios";

export const getCalendarApiHealth = async (): Promise<ServiceStatusSchema> => {
  return axios
    .get(`${process.env.SVF_CALENDARAPI_BASEURL}/api/health`)
    .then((res) => {
      const response: any = res.data;
      const serviceStatus: HealthyServiceInfoSchema = {
        name: response?.name,
        version: response?.version ?? "unknown",
        status: res.status ?? 200,
      };
      return serviceStatus;
    })
    .catch((err) => {
      if (err.response?.status) {
        const serviceStatus: UnhealthyServiceInfoSchema = {
          name: "calendar-api",
          version: "unknown",
          status: err.response.status,
          error: err.response?.statusText ?? "Unknown error",
        };
        return serviceStatus;
      }

      if (err.errors && err.errors.length > 0) {
        const serviceStatus: UnhealthyServiceInfoSchema = {
          name: "calendar-api",
          version: "unknown",
          status: 503,
          error: err.errors
            .map((error: { code: any }) => error.code)
            .join(", "),
        };
        return serviceStatus;
      }

      const serviceStatus: UnhealthyServiceInfoSchema = {
        name: "calendar-api",
        version: "unknown",
        status: 500,
        error: "Unknown error",
      };
      return serviceStatus;
    });
};
