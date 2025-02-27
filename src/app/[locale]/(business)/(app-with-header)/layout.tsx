"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import HeaderSearchBar from "@/app/[locale]/(business)/(app-with-header)/_components/header-search-bar";
import UserMenu from "@/app/_components/user-menu";
import { publicConfig } from "@/lib/config/client-config";
import { cn } from "@/lib/tailwind";
import queryClient from "@/lib/tanstack-query";

import type { PropsWithChildren } from "react";

const AppWithHeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        <div
          className={cn(
            "border-foreground z-50 w-full flex-row items-center gap-x-6 border-b bg-stone-50 px-8 py-6 drop-shadow dark:bg-stone-900",
            "flex md:grid md:grid-cols-[1fr_calc(var(--spacing)*128)_1fr]",
          )}
        >
          <p
            className={cn(
              "font-title text-2xl font-semibold tracking-wide uppercase",
              "hidden md:block",
              "invisible w-0 lg:visible lg:w-auto",
            )}
          >
            {publicConfig.appName}
          </p>

          <HeaderSearchBar className="grow md:w-128 md:grow-0" />

          <UserMenu className="md:justify-self-end" />
        </div>

        <div className="flex flex-col p-8">{children}</div>
      </div>
    </QueryClientProvider>
  );
};

export default AppWithHeaderLayout;
