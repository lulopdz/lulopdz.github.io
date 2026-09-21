import { defineCollection, z } from 'astro:content';

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    link: z.string().optional(),
    linkLabel: z.string().default('Paper'),
    bibtex: z.string().optional(),
    featured: z.boolean().default(false),
    type: z.enum(['journal', 'conference', 'preprint', 'other']).default('conference'),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    codeTitle: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    inProgress: z.boolean().default(false),
    statusBadge: z.string().optional(),
    link: z.string().optional(),
    linkLabel: z.string().default('Access'),
    liveDemo: z.string().optional(),
    code: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = {
  papers,
  projects,
};
