import type { Loader } from "astro/loaders";
import { AstroError } from "astro/errors";

import { sanityClient } from 'sanity:client';
import { match } from 'ts-pattern';
import groq from 'groq';

const getQuery = (contentType: string) => (
  match(contentType)
    .with("movie", () => groq`*[_type == 'movie']`)
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
