"use server";

import { parseWithZod } from "@conform-to/zod";
import { getLocale } from "next-intl/server";

import { getCurrentUser } from "@/lib/auth";
import { redirect } from "@/lib/i18n";
import { Routes } from "@/lib/routes";

import { createBeerSchema } from "./schemas";

export const createBeerAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const locale = await getLocale();

  const user = await getCurrentUser();
  if (!user) {
    redirect({ href: Routes.SIGN_IN, locale });
  }

  const submission = parseWithZod(formData, {
    schema: createBeerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply({
      resetForm: false,
    });
  }

  console.log(submission.value);

  // const beer = await createBeer(submission.value);

  // redirect({
  //   href: generatePath(Routes.BEER, {
  //     brewerySlug: beer.brewery.slug,
  //     beerSlug: beer.slug,
  //   }),
  //   locale,
  // });
};
