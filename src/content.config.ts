import { defineCollection, z } from 'astro:content';

import { sanityLoader } from './lib/sanityLoader';


const movies = defineCollection({
  loader: sanityLoader({
    contentType: 'movie',
  }),
  schema: z.object({
    title: z.string(),
  }).passthrough()
})

export const collections = { movies };
