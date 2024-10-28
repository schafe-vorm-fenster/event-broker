// next js app router GET api route handler

import { createNextHandler } from "@ts-rest/serverless/next";
import packageJson from "../../../../package.json" assert { type: "json" };
import { InfoContract } from "./info.contract";

const handler = createNextHandler(
  InfoContract,
  {
    info: async () => {
      return {
        status: 200,
        body: {
          status: 200,
          version: packageJson.version,
          name: packageJson.name,
          description: packageJson.description,
        },
      };
    },
  },
  {
    handlerType: "app-router",
  }
);

export { handler as GET };
