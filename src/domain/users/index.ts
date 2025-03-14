"server only";

import { cache } from "react";

import { UnknownReviewError, UnknownUserError } from "@/domain/users/errors";
import {
  transformRawReviewToReview,
  transformRawUserReviewToUserReview,
  transformRawUserToUser,
} from "@/domain/users/transforms";
import { getPaginatedResults } from "@/lib/pagination";
import prisma from "@/lib/prisma";

import type { UserReview, User, Review } from "@/domain/users/types";
import type {
  PaginatedResults,
  PaginationParams,
} from "@/lib/pagination/types";

export const getUserByUsername = cache(
  async (username: string): Promise<User> => {
    const [[user], [stats]] = await Promise.all([
      prisma.users.findMany({
        where: { username: { equals: username, mode: "insensitive" } },
        include: { _count: { select: { reviews: true } } },
      }),
      prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT reviews.beer_id) AS unique_beers,
          COUNT(DISTINCT breweries.id) AS unique_breweries,
          COUNT(DISTINCT beers.style_id) AS unique_styles,
          COUNT(DISTINCT breweries.country_alpha_2_code) AS unique_countries
        FROM public.reviews
        LEFT JOIN public.users ON reviews.user_id = users.id
        LEFT JOIN beer_data.beers ON reviews.beer_id = beers.id
        LEFT JOIN beer_data.breweries ON beers.brewery_id = breweries.id
        WHERE LOWER(users.username) = LOWER(${username});
      ` as Promise<
        {
          unique_beers: number;
          unique_breweries: number;
          unique_styles: number;
          unique_countries: number;
        }[]
      >,
    ]);

    if (!user || !stats) {
      throw new UnknownUserError();
    }

    return transformRawUserToUser({
      ...user,
      ...stats,
    });
  },
);

export const getReviewsByUser = cache(
  async ({
    userId,
    limit = 20,
    page = 1,
  }: PaginationParams<{ userId: string }>): Promise<
    PaginatedResults<UserReview>
  > => {
    const [rawReviews, reviewCount] = await Promise.all([
      prisma.reviews.findMany({
        where: { userId },
        include: {
          beer: {
            include: {
              brewery: true,
              color: true,
            },
          },
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: "desc" },
      }),

      prisma.reviews.count({
        where: { userId },
      }),
    ]);

    const reviews = await Promise.all(
      rawReviews.map(transformRawUserReviewToUserReview),
    );

    return getPaginatedResults(reviews, reviewCount, page, limit);
  },
);

export const getReviewByUsernameAndSlug = cache(
  async (username: string, reviewSlug: string): Promise<Review> => {
    const [user] = await prisma.users.findMany({
      where: { username: { equals: username, mode: "insensitive" } },
    });

    if (!user) {
      throw new UnknownUserError();
    }

    const review = await prisma.reviews.findUnique({
      where: {
        slug_userId: {
          slug: reviewSlug,
          userId: user.id,
        },
      },
      include: {
        user: true,
        beer: { include: { brewery: true, style: true } },
      },
    });

    if (!review) {
      throw new UnknownReviewError();
    }

    return transformRawReviewToReview(review);
  },
);
