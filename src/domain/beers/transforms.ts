"server only";

import { getCountry } from "@/lib/i18n/countries";

import type { Beer, RawBeer } from "@/domain/beers/types";

export const transformRawBeerToBeer = async (
  rawBeer: RawBeer,
): Promise<Beer> => ({
  id: rawBeer.id,
  slug: rawBeer.slug,
  name: rawBeer.name,
  brewery: {
    id: rawBeer.brewery.id,
    slug: rawBeer.brewery.slug,
    name: rawBeer.brewery.name,
    country: await getCountry(rawBeer.brewery.countryAlpha2Code),
  },
  style: rawBeer.style.name,
  abv: rawBeer.abv,
  ibu: rawBeer.ibu ?? undefined,
  color: {
    name: rawBeer.color.name,
    hex: rawBeer.color.hex,
  },
});
