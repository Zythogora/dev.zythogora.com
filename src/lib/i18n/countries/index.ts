import countries from "i18n-iso-countries";
import { getLocale } from "next-intl/server";

import { routing } from "@/lib/i18n";
import { UnknownCountryCodeError } from "@/lib/i18n/countries/errors";

routing.locales.map((locale) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  countries.registerLocale(require(`i18n-iso-countries/langs/${locale}.json`));
});

export const getCountryName = async (code: string): Promise<string> => {
  const locale = await getLocale();

  const countryName = countries.getName(code, locale);

  if (countryName === undefined) {
    throw new UnknownCountryCodeError(code);
  }

  return countryName;
};

export default countries;
