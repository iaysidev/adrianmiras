import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = ({ site: origin }) => {
  const sitemap = origin ? `\nSitemap: ${new URL('sitemap.xml', origin)}` : '';
  return new Response(`User-agent: *\n${site.readyToIndex ? 'Allow: /' : 'Disallow: /'}${site.readyToIndex ? sitemap : ''}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
