import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";

import CreateBeerForm from "@/app/[locale]/create/beer/_components/form";
import { getColors, getStyles } from "@/domain/beers";
import { auth } from "@/lib/auth/server";
import { redirect } from "@/lib/i18n";
import { Routes } from "@/lib/routes";

const CreateBeerPage = async () => {
  const t = await getTranslations();

  const locale = await getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect({ href: Routes.SIGN_IN, locale });
  }

  const [styleCategories, colors] = await Promise.all([
    getStyles(),
    getColors(),
  ]);

  return (
    <div className="@container flex size-full min-h-screen items-center justify-center p-8">
      <div className="flex w-fit flex-col gap-y-8">
        <h1 className="text-2xl font-semibold">{t("createBeerPage.title")}</h1>

        <CreateBeerForm styleCategories={styleCategories} colors={colors} />
      </div>
    </div>
  );
};

export default CreateBeerPage;
