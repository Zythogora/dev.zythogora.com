"server only";

import { PostHog } from 'posthog-node'

import config from "@/lib/config/server";

export const getPostHog = () => new PostHog(config.posthog.apiKey, {
  host: config.posthog.host,
});