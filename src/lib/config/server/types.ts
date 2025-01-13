import { z } from "zod";

import { clientSideSchema } from "@/lib/config/client/types";

export enum NodeEnv {
  production = "production",
  development = "development",
  test = "test",
}

export const serverSideSchema = clientSideSchema.extend({
  NODE_ENV: z.nativeEnum(NodeEnv),
});
