"use client";

import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { getZodConstraint } from "@conform-to/zod";
import { PlusIcon } from "lucide-react";
import { useActionState, useState, useTransition } from "react";

import SocialLink from "@/app/[locale]/create/brewery/_components/social-link";
import { createBreweryAction } from "@/app/[locale]/create/brewery/actions";
import {
  createBrewerySchema,
  type CreateBrewery,
} from "@/app/[locale]/create/brewery/schemas";
import FormInput from "@/app/_components/form/input";
import Button from "@/app/_components/ui/button";
import Label from "@/app/_components/ui/label";
import { cn } from "@/lib/tailwind";

const CreateBreweryPage = () => {
  const [socialLinks, setSocialLinks] = useState<CreateBrewery["socialLinks"]>([
    { name: "", url: "" },
  ]);

  const [lastResult, action] = useActionState(createBreweryAction, undefined);
  const [isPending, startTransition] = useTransition();

  const [form, fields] = useForm({
    defaultValue: { socialLinks },

    lastResult,

    constraint: getZodConstraint(createBrewerySchema),

    onValidate({ formData }) {
      // Remove empty social links
      Array.from(formData.keys())
        .filter((key) => key.match(/socialLinks\[(\d+)\]\.name/))
        .forEach((key, index) => {
          if (
            formData.get(`socialLinks[${index}].name`) === "" &&
            formData.get(`socialLinks[${index}].url`) === ""
          ) {
            formData.delete(`socialLinks[${index}].name`);
            formData.delete(`socialLinks[${index}].url`);
          }
        });

      return parseWithZod(formData, { schema: createBrewerySchema });
    },

    onSubmit(event, { formData }) {
      event.preventDefault();
      startTransition(() => {
        action(formData);
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", url: "" }]);
  };

  const handleChangeSocialLink = (
    index: number,
    field: keyof CreateBrewery["socialLinks"][number],
    value: string,
  ) => {
    setSocialLinks(
      socialLinks.map((socialLink, i) =>
        i === index ? { ...socialLink, [field]: value } : socialLink,
      ),
    );
  };

  const handleRemoveSocialLink = (index: number) => {
    if (socialLinks.length === 1) {
      setSocialLinks([{ name: "", url: "" }]);
    } else {
      setSocialLinks(socialLinks.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="@container flex size-full min-h-screen items-center justify-center p-8">
      <FormProvider context={form.context}>
        <form
          {...getFormProps(form)}
          className={cn(
            "grid flex-col gap-x-6 gap-y-8",
            "w-full grid-cols-2 @3xl:w-192 @3xl:grid-cols-7",
          )}
        >
          <FormInput
            label="Name"
            field={fields.name}
            type="text"
            className="col-span-2 @3xl:col-span-5"
          />

          <FormInput
            label="Creation Date"
            field={fields.creationDate}
            type="date"
            showOptional
            className="col-span-2 row-start-6 @3xl:row-start-auto"
          />

          <FormInput
            label="Country"
            field={fields.country}
            type="text"
            className="col-span-2 @3xl:col-span-3"
          />

          <FormInput
            label="State"
            field={fields.state}
            type="text"
            showOptional
            className="@3xl:col-span-2"
          />

          <FormInput
            label="City"
            field={fields.city}
            type="text"
            showOptional
            className="@3xl:col-span-2"
          />

          <FormInput
            label="Address"
            field={fields.address}
            type="text"
            showOptional
            className="col-span-2 @3xl:col-span-7"
          />

          <FormInput
            label="Description"
            field={fields.description}
            type="text"
            showOptional
            className="col-span-2 @3xl:col-span-7"
          />

          <FormInput
            label="Website link"
            field={fields.websiteLink}
            type="text"
            showOptional
            className="col-span-2 @3xl:col-span-7"
          />

          <div className="col-span-2 flex flex-col gap-y-1 @3xl:col-span-7">
            <Label htmlFor={fields.socialLinks.id} showOptional>
              Social links
            </Label>

            <div className="flex flex-col items-start gap-y-4">
              <div className="flex w-full flex-col gap-y-6">
                {socialLinks.map((socialLink, index) => (
                  <SocialLink
                    key={index}
                    index={index}
                    socialLink={socialLink}
                    onChange={handleChangeSocialLink}
                    onRemove={handleRemoveSocialLink}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddSocialLink}
                aria-label="Add a new social link"
                className={cn(
                  "ml-2 flex flex-row items-center gap-x-2 rounded px-1",
                  "focus-visible:outline-primary focus-visible:outline-3 focus-visible:outline-offset-4",
                )}
              >
                <PlusIcon className="size-4" />

                <span>Add social link</span>
              </button>
            </div>
          </div>

          <FormInput
            label="Contact email"
            field={fields.contactEmail}
            type="email"
            showOptional
            className="col-span-2 @3xl:col-span-4"
          />

          <FormInput
            label="Contact phone number"
            field={fields.contactPhoneNumber}
            type="tel"
            showOptional
            className="col-span-2 @3xl:col-span-3"
          />

          <Button
            type="submit"
            disabled={isPending}
            className="col-span-2 w-full @3xl:col-span-7"
          >
            SUBMIT
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateBreweryPage;
