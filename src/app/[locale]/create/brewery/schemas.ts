import { z } from "zod";

export const createBrewerySchema = z.object({
  name: z.string({ required_error: "form.errors.FIELD_REQUIRED" }),
  country: z.string({ required_error: "form.errors.FIELD_REQUIRED" }),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  creationDate: z.string().optional(),
  description: z.string().optional(),
  websiteLink: z.string().optional(),
  socialLinks: z.array(
    z.object({
      name: z.string({ required_error: "form.errors.FIELD_REQUIRED" }),
      url: z
        .string({ required_error: "form.errors.FIELD_REQUIRED" })
        .regex(/^[^\s\.]+\.\S{2,}$/, {
          message: "form.errors.URL_INVALID",
        }),
    }),
  ),
  contactEmail: z.string().optional(),
  contactPhoneNumber: z.string().optional(),
});

export type CreateBrewery = z.infer<typeof createBrewerySchema>;
