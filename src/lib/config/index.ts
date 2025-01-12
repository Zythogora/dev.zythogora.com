import { z } from "zod";

export const strictBooleanSchema = z.preprocess((value) => {
  const result = z
    .enum(["true", "false"])
    .transform((enumValue) => JSON.parse(enumValue))
    .safeParse(value);
  return result.success ? result.data : value;
}, z.boolean());

