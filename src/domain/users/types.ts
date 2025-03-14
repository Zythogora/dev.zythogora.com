import type { Color } from "@/domain/beers/types";
import type { Country } from "@/lib/i18n/countries/types";
import type {
  Acidity,
  AromasIntensity,
  Beers,
  Bitterness,
  BodyStrength,
  Breweries,
  CarbonationIntensity,
  Colors,
  Duration,
  FlavorsIntensity,
  Haziness,
  HeadRetention,
  LabelDesign,
  LegacyStyles,
  Reviews,
  ServingFrom,
  Users,
} from "@prisma/client";

export type RawUser = Users & {
  _count: { reviews: number };
  unique_beers: number;
  unique_breweries: number;
  unique_styles: number;
  unique_countries: number;
};

export type User = {
  id: string;
  username: string;
  reviewCount: number;
  uniqueBeerCount: number;
  uniqueBreweryCount: number;
  uniqueStyleCount: number;
  uniqueCountryCount: number;
};

export type RawUserReview = Reviews & {
  beer: Beers & {
    brewery: Breweries;
    color: Colors;
  };
};

export type UserReview = {
  id: string;
  slug: string;
  globalScore: number;
  beer: {
    id: string;
    name: string;
    brewery: {
      id: string;
      name: string;
      country: Country;
    };
    color: Color;
  };
  createdAt: Date;
  hasDetails: boolean;
};

export type RawReview = Reviews & {
  user: Users;
  beer: Beers & {
    brewery: Breweries;
    style: LegacyStyles;
  };
};

export type Review = {
  id: string;
  slug: string;
  globalScore: number;
  servingFrom: ServingFrom;
  comment?: string;
  labelDesign?: LabelDesign;
  haziness?: Haziness;
  headRetention?: HeadRetention;
  aromasIntensity?: AromasIntensity;
  flavorsIntensity?: FlavorsIntensity;
  bodyStrength?: BodyStrength;
  carbonationIntensity?: CarbonationIntensity;
  bitterness?: Bitterness;
  acidity?: Acidity;
  duration?: Duration;
  user: {
    username: string;
  };
  beer: {
    id: string;
    slug: string;
    name: string;
    abv: number;
    ibu?: number;
    style: string;
    brewery: {
      id: string;
      slug: string;
      name: string;
    };
  };
  createdAt: Date;
  hasAppearance: boolean;
  hasNose: boolean;
  hasTaste: boolean;
  hasFinish: boolean;
};
