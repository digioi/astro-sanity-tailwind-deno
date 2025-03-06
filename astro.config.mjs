// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import process from "node:process";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    // @ts-expect-error: tailwindcss is throwing an error
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId: process.env['SANITY_PROJECT_ID'],
      dataset: process.env['SANITY_DATASET'],
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: '/admin',
      stega: {
        studioUrl: '/admin'
      }
    }),
    react(),
  ],
});
