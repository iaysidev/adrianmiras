import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    category: z.enum(['Web', 'Product', 'Graphic', 'Editorial', 'Branding']),
    tags: z.array(z.string()),
    order: z.number(),
    featured: z.boolean().default(true),
    draft: z.boolean().default(false),
    status: z.enum(['In progress', 'Selected work', 'Concept']).default('Selected work'),
    visual: z.enum(['web', 'mobile', 'print', 'editorial', 'tourism']),
    contribution: z.string(),
    tools: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
