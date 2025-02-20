import { APIError } from "better-auth/api";

import {
  CredentialsInvalidError,
  EmailAlreadyExistsError,
  EmailNotVerifiedError,
  PasswordTooLongError,
  PasswordTooShortError,
  UnknownSignInError,
  UnknownSignUpError,
  UsernameAlreadyExistsError,
} from "@/domain/auth/errors";
import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";

type SignInParams = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: email as string,
        password: password as string,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (
        error.body.code === "INVALID_EMAIL" ||
        error.body.code === "INVALID_PASSWORD" ||
        error.body.code === "INVALID_EMAIL_OR_PASSWORD"
      ) {
        throw new CredentialsInvalidError();
      } else if (error.body.code === "EMAIL_NOT_VERIFIED") {
        throw new EmailNotVerifiedError();
      }
    }

    console.error(error);
    throw new UnknownSignInError();
  }
};

type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

export const signUp = async ({ username, email, password }: SignUpParams) => {
  const existingUserWithUsername = await prisma.users.findUnique({
    where: { username },
  });

  if (existingUserWithUsername !== null) {
    throw new UsernameAlreadyExistsError();
  }

  let response;
  try {
    response = await auth.api.signUpEmail({
      body: {
        email: email as string,
        password: password as string,
        name: username as string,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.body.code === "USER_ALREADY_EXISTS") {
        throw new EmailAlreadyExistsError();
      } else if (error.body.code === "PASSWORD_TOO_SHORT") {
        throw new PasswordTooShortError();
      } else if (error.body.code === "PASSWORD_TOO_LONG") {
        throw new PasswordTooLongError();
      }
    }

    console.error(error);
    throw new UnknownSignUpError();
  }

  try {
    await prisma.users.create({
      data: {
        id: response.user.id,
        username: username as string,
      },
    });
  } catch (error) {
    // Force delete the BetterAuth user from the database if the second
    // creation fails. We do not want to use the `auth.api.deleteUser()`
    // method because it would require to send an email to the user to
    // properly delete its record.

    await prisma.betterAuthUsers.delete({
      where: {
        id: response.user.id,
      },
    });

    console.error(error);
    throw new UnknownSignUpError();
  }

  return response.user.id;
};

export const isUserVerified = async (email: string) => {
  const user = await prisma.betterAuthUsers.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  return user.emailVerified;
};
