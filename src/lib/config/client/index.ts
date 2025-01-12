import { clientSideSchema } from "./types";

const loadClientConfig = () => {
  const parseResult = clientSideSchema.safeParse({
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_REVERSE_PROXY: process.env.NEXT_PUBLIC_POSTHOG_REVERSE_PROXY,
    NEXT_PUBLIC_POSTHOG_API_KEY: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
  });

  if (!parseResult.success) {
    const errors = parseResult.error.issues.map(
      (issue) => ` - ${issue.path.join('.')}: ${issue.message}`,
    );

    throw new Error(
      `Missing required client env variables:\n\t${errors.join(',\n\t')}`,
    );
  }

  const env = parseResult.data;

  return {
    posthog: {
      host: env.NEXT_PUBLIC_POSTHOG_HOST,
      reverseProxy: env.NEXT_PUBLIC_POSTHOG_REVERSE_PROXY,
      apiKey: env.NEXT_PUBLIC_POSTHOG_API_KEY,
    },
  };
};

const config = loadClientConfig();

export default config;
