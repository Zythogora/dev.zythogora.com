import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

import BeerTab from "@/app/[locale]/(business)/(without-header)/search/_components/tab/beer";
import BreweryTab from "@/app/[locale]/(business)/(without-header)/search/_components/tab/brewery";
import { searchParamsSchema } from "@/app/[locale]/(business)/(without-header)/search/schemas";
import Await from "@/app/_components/await";
import { searchBeers, searchBreweries } from "@/domain/search";
import { redirect } from "@/lib/i18n";
import { Routes } from "@/lib/routes";

interface SearchPageProps {
  searchParams: Promise<{
    kind?: string;
    search?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const t = await getTranslations();

  const locale = await getLocale();

  const searchParamsResult = searchParamsSchema.safeParse(await searchParams);

  if (!searchParamsResult.success) {
    return redirect({
      href: Routes.SEARCH,
      locale,
    });
  }

  return {
    title:
      searchParamsResult.data.kind === "beer"
        ? t("searchPage.metadata.beerTabTitle")
        : t("searchPage.metadata.breweryTabTitle"),
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const t = await getTranslations();

  const locale = await getLocale();

  const searchParamsResult = searchParamsSchema.safeParse(await searchParams);

  if (!searchParamsResult.success) {
    return redirect({
      href: Routes.SEARCH,
      locale,
    });
  }

  const { search, kind, limit, page } = searchParamsResult.data;

  if (kind === "beer") {
    if (!search) {
      return <p>{t("searchPage.beer.noSearch")}</p>;
    }

    return (
      <Suspense
        key={`${kind}-${search}-${page}`}
        fallback={<p>{t("searchPage.beer.searching", { search })}</p>}
      >
        <Await promise={searchBeers({ search, limit, page })}>
          {({ results, count, page }) => (
            <BeerTab results={results} count={count} page={page} />
          )}
        </Await>
      </Suspense>
    );
  }

  if (kind === "brewery") {
    if (!search) {
      return <p>{t("searchPage.brewery.noSearch")}</p>;
    }

    return (
      <Suspense
        key={`${kind}-${search}-${page}`}
        fallback={<p>{t("searchPage.brewery.searching", { search })}</p>}
      >
        <Await
          promise={searchBreweries({
            search,
            limit,
            page,
          })}
        >
          {({ results, count, page }) => (
            <BreweryTab results={results} count={count} page={page} />
          )}
        </Await>
      </Suspense>
    );
  }
};

export default SearchPage;
