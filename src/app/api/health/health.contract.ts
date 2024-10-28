import { ErrorSchema } from "@/src/rest/error.schema";
import { initContract } from "@ts-rest/core";
import { HealthSchema } from "@/src/rest/health.schema";

const c = initContract();

export const HealthContract = c.router({
  health: {
    method: "GET",
    path: "/api/health",
    responses: {
      200: HealthSchema,
      500: ErrorSchema,
    },
  },
});
