import { initContract } from "@ts-rest/core";
import { HealthContract } from "./health/health.contract";
import { InfoContract } from "./info/info.contract";

const c = initContract();

export const ApiContract = c.router({
  health: HealthContract,
  info: InfoContract,
});
