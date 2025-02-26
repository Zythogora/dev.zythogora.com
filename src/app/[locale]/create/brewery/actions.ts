"use server";

import { parseWithZod } from "@conform-to/zod";

import { createBrewerySchema } from "@/app/[locale]/create/brewery/schemas";

export const createBreweryAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: createBrewerySchema,
  });

  console.log(
    JSON.stringify(
      { status: submission.status, payload: submission.payload },
      null,
      2,
    ),
  );

  if (submission.status !== "success") {
    return submission.reply({
      resetForm: false,
    });
  }
};
