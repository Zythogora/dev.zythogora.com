"server only";

import clientConfig from "@/lib/config/client";

import { serverSideSchema } from "./types";

const loadServerConfig = () => {
  const parseResult = serverSideSchema.safeParse({
    ...process.env,
  });

  if (!parseResult.success) {
    const errors = parseResult.error.issues.map(
      (issue) => ` - ${issue.path.join(".")}: ${issue.message}`,
    );

    throw new Error(
      `Missing required env variables:\n\t${errors.join(",\n\t")}`,
    );
  }

  const env = parseResult.data;

  return {
    ...clientConfig,
    nodeEnv: env.NODE_ENV,
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  };
};

const config = loadServerConfig();

export default config;
