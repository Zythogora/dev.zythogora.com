"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { PropsWithChildren } from "react";

import config from "@/lib/config/client";

const PostHogProvider = ({ children }: PropsWithChildren) => {
  if (typeof window === "undefined") {
    return children;
  }

  posthog.init(config.posthog.apiKey, {
    api_host: config.posthog.reverseProxy,
    ui_host: config.posthog.host,
    person_profiles: "always",
  });

  return <PHProvider client={posthog}>{children}</PHProvider>;
};

export default PostHogProvider;
