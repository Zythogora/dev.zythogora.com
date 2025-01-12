import { z } from "zod";

export const clientSideSchema = z.object({
  NEXT_PUBLIC_POSTHOG_HOST: z.string(),
  NEXT_PUBLIC_POSTHOG_REVERSE_PROXY: z.string(),
  NEXT_PUBLIC_POSTHOG_API_KEY: z.string(),
});

