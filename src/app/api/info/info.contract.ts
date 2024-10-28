import { ErrorSchema } from "@/src/rest/error.schema";
import { initContract } from "@ts-rest/core";
import { HealthSchema } from "@/src/rest/health.schema";

const c = initContract();

export const InfoContract = c.router({
  info: {
    method: "GET",
    path: "/api/info",
    responses: {
      200: HealthSchema,
      500: ErrorSchema,
    },
  },
});
