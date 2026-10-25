import { defineConfig } from 'astro/config';

export default defineConfig({
  ...(process.env.SITE_URL ? { site: process.env.SITE_URL } : {}),
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
