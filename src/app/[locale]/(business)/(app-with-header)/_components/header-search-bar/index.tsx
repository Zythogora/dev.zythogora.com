"use client";

import { useQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { searchAction } from "@/app/[locale]/(business)/(app-with-header)/_components/header-search-bar/actions";
import BeerSearchResult from "@/app/[locale]/(business)/(search)/search/_components/tab/beer/result";
import BrewerySearchResult from "@/app/[locale]/(business)/(search)/search/_components/tab/brewery/result";
import { SEARCH_KINDS } from "@/app/[locale]/(business)/(search)/search/types";
import Input from "@/app/_components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/app/_components/ui/popover";
import Tab from "@/app/_components/ui/tab";
import { usePlatformDetection } from "@/lib/browser/hooks";
import { Link, usePathname, useRouter } from "@/lib/i18n";
import { Routes } from "@/lib/routes";
import { generatePath } from "@/lib/routes/utils";
import { cn } from "@/lib/tailwind";

import type { SearchKind } from "@/app/[locale]/(business)/(search)/search/types";
import type { ChangeEvent } from "react";

interface HeaderSearchBarProps {
  className?: string;
}

const HeaderSearchBar = ({ className }: HeaderSearchBarProps) => {
  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [searchKind, setSearchKind] = useState<SearchKind>("beer");

  const [resultsVisible, setResultsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const platform = usePlatformDetection();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setResultsVisible(false);
  }, [pathname]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const searchResults = useQuery({
    queryFn: () => searchAction(search),
    queryKey: ["search", search],
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setResultsVisible(e.target.value !== "");
  };

  const handleTabClick = (searchKind: SearchKind) => {
    setSearchKind(searchKind);
  };

  return (
    <>
      <Popover open={resultsVisible} onOpenChange={setResultsVisible}>
        <PopoverAnchor className={className}>
          <Command shouldFilter={false}>
            <div className="relative">
              <SearchIcon className="text-foreground absolute top-1/2 left-5 z-50 -translate-y-1/2" />

              <Command.Input asChild>
                <Input
                  ref={inputRef}
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={() => setResultsVisible(true)}
                  className={cn(
                    "before:rounded-full",
                    "*:data-[slot=input]:rounded-full *:data-[slot=input]:pl-13",
                    "sm:*:data-[slot=input]:pr-22",
                  )}
                />
              </Command.Input>

              {platform.isDetected ? (
                <kbd
                  className={cn(
                    "font-title border-foreground absolute top-1/2 right-6 -translate-y-1/2 flex-row items-center gap-x-1 rounded border-2 px-2 py-1 opacity-25",
                    "bg-stone-200 dark:bg-stone-800",
                    "hidden sm:flex",
                  )}
                >
                  {platform.isMac ? (
                    <span className="flex h-4 flex-col justify-center">⌘</span>
                  ) : (
                    <span className="text-xs">Ctrl</span>
                  )}

                  <span className="text-xs">K</span>
                </kbd>
              ) : null}
            </div>

            {search !== "" && searchResults.data ? (
              <PopoverContent
                align="start"
                sideOffset={8}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="w-[calc(100vw-theme(spacing.16)+theme(spacing.1))] p-0 sm:w-[var(--radix-popper-anchor-width)]"
              >
                <Command.List
                  className={cn(
                    "rounded px-3 py-4",
                    "bg-background dark:bg-stone-700",
                    "*:[&[cmdk-list-sizer]]:flex *:[&[cmdk-list-sizer]]:flex-col *:[&[cmdk-list-sizer]]:gap-y-4",
                    "**:data-[slot=search-bar-item]:cursor-pointer **:data-[slot=search-bar-item]:rounded",
                    "**:data-[slot=search-bar-item]:data-[selected=true]:outline-primary **:data-[slot=search-bar-item]:data-[slot=search-bar-item]:data-[selected=true]:outline-3 **:data-[slot=search-bar-item]:data-[slot=search-bar-item]:data-[selected=true]:-outline-offset-3",
                  )}
                >
                  <div className="flex flex-row gap-x-3 px-3 pt-3">
                    {SEARCH_KINDS.map((searchTab) => (
                      <Tab
                        key={searchTab}
                        active={searchKind === searchTab}
                        onClick={() => handleTabClick(searchTab)}
                      >
                        {t(`searchPage.${searchTab}.tabName`)}
                      </Tab>
                    ))}
                  </div>

                  <div className="flex flex-col">
                    <p className="px-3 py-2 text-base">
                      {searchResults.data?.[searchKind].count} item(s) found
                    </p>

                    {searchKind === "beer"
                      ? searchResults.data?.beer.results.map((beer) => (
                          <Command.Item
                            key={beer.id}
                            onSelect={() => {
                              router.push(
                                generatePath(Routes.BEER, {
                                  brewerySlug: beer.brewery.slug,
                                  beerSlug: beer.slug,
                                }),
                              );
                            }}
                            data-slot="search-bar-item"
                            className="p-1.5"
                            asChild
                          >
                            <Link
                              href={generatePath(Routes.BEER, {
                                brewerySlug: beer.brewery.slug,
                                beerSlug: beer.slug,
                              })}
                            >
                              <BeerSearchResult
                                name={beer.name}
                                brewery={beer.brewery}
                                style={beer.style}
                                abv={beer.abv}
                                ibu={beer.ibu}
                                color={beer.color}
                              />
                            </Link>
                          </Command.Item>
                        ))
                      : searchKind === "brewery"
                        ? searchResults.data?.brewery.results.map((brewery) => (
                            <Command.Item
                              key={brewery.id}
                              onSelect={() => {
                                router.push(
                                  generatePath(Routes.BREWERY, {
                                    brewerySlug: brewery.slug,
                                  }),
                                );
                              }}
                              data-slot="search-bar-item"
                              className="p-1.5 pl-3"
                              asChild
                            >
                              <Link
                                href={generatePath(Routes.BREWERY, {
                                  brewerySlug: brewery.slug,
                                })}
                              >
                                <BrewerySearchResult
                                  key={brewery.id}
                                  name={brewery.name}
                                  location={{ country: brewery.country }}
                                  beerCount={brewery.beerCount}
                                />
                              </Link>
                            </Command.Item>
                          ))
                        : null}
                  </div>

                  {searchResults.data?.[searchKind].count > 3 && (
                    <Command.Item
                      onSelect={() => {
                        router.push(
                          `${Routes.SEARCH}?search=${search}&kind=${searchKind}`,
                        );
                      }}
                      data-slot="search-bar-item"
                      className="mx-auto w-fit px-3 py-2"
                      asChild
                    >
                      <Link
                        href={`${Routes.SEARCH}?search=${search}&kind=${searchKind}`}
                        className="text-primary-700 dark:text-primary underline"
                      >
                        See {searchResults.data?.[searchKind].count - 3} more
                        item(s)
                      </Link>
                    </Command.Item>
                  )}
                </Command.List>
              </PopoverContent>
            ) : null}
          </Command>
        </PopoverAnchor>
      </Popover>
    </>
  );
};

export default HeaderSearchBar;
