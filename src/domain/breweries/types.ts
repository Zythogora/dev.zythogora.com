import type { Country } from "@/lib/i18n/countries/types";
import type { Beers, Breweries, Colors, Styles } from "@prisma/client";

export type RawBrewery = Breweries & {
  beers: RawBreweryBeer[];
};

export type Brewery = {
  id: string;
  slug: string;
  name: string;
  location: {
    country: Country;
    state?: string;
    city?: string;
    address?: string;
  };
  creationYear?: number;
  description?: string;
  websiteLink?: string;
  socialLinks?: {
    name: string;
    url: string;
  }[];
  contactEmail?: string;
  contactPhoneNumber?: string;
  beers: BreweryBeer[];
};

export type RawBreweryBeer = Beers & {
  style: Styles;
  color: Colors;
};

export type BreweryBeer = {
  id: string;
  slug: string;
  name: string;
  style: string;
  abv: number;
  ibu?: number;
  color: {
    name: string;
    hex: string;
  };
};
