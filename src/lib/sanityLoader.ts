import type { Loader } from "astro/loaders";
import { AstroError } from "astro/errors";

import { sanityClient } from 'sanity:client';
import { match } from 'ts-pattern';
import { AllMovieQuery } from "@/db/movies.queries";

const getQuery = (contentType: string) => (
  match(contentType)
    .with("movie", () => AllMovieQuery)
    .otherwise(() => null)
);

export function sanityLoader({ contentType }: { contentType: string }): Loader {
  return {
    name: `sanity-loader`,
    load: async ({ store, logger }) => {

      const query = getQuery(contentType);
      if (!query) {
        logger.error("Invalid Content Type");
        throw new AstroError("Invalid Content Type");
      }

      logger.info(`Loading data from "${contentType}"`);
      const records = await sanityClient.fetch(query);

      for (const { slug, ...fields } of records) {
        store.set({ id: slug.current, data: fields })
      }
      logger.info(`Loaded ${records.length} records from ${contentType}`);
    },

  };
};
