/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
