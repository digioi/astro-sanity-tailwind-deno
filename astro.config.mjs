// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import process from "node:process";
import * as path from "https://deno.land/std@0.207.0/path/mod.ts";

import "jsr:@std/dotenv/load";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    // @ts-expect-error: tailwindcss is throwing an error
    plugins: [tailwindcss()],
    define: {
      "process.env": {
        SANITY_STUDIO_PROJECT_ID: process.env['SANITY_STUDIO_PROJECT_ID'],
        SANITY_STUDIO_DATASET: process.env['SANITY_STUDIO_DATASET'],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      },
    },
  },
  integrations: [
    sanity({
      projectId: process.env['SANITY_STUDIO_PROJECT_ID'],
      dataset: process.env['SANITY_STUDIO_DATASET'],
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
