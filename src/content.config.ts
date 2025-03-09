import { defineCollection } from "astro:content";

import { sanityLoader } from "./lib/sanityLoader";

const movies = defineCollection({
  loader: sanityLoader({
    contentType: "movie",
  }),
});

export const collections = { movies };
