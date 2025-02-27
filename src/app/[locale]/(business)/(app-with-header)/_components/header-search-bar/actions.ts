"use server";

import { searchBeers, searchBreweries } from "@/domain/search";

export const searchAction = async (search: string) => {
  const [beer, brewery] = await Promise.all([
    searchBeers({ search, limit: 3, page: 1 }),
    searchBreweries({ search, limit: 3, page: 1 }),
  ]);

  return { beer, brewery };
};
