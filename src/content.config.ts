import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    inProgress: z.boolean().default(false),
    statusBadge: z.string().optional(),
    link: z.string().optional(),
    linkLabel: z.string().default('Access'),
    code: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const teaching = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teaching' }),
  schema: z.object({
    course: z.string(),
    code: z.string(),
    institution: z.string(),
    institutionUrl: z.string().optional(),
    role: z.string(),
    term: z.string(),
    year: z.number(),
    current: z.boolean().default(false),
    // Folder name under public/teaching/ whose files are listed at /teaching/<materialsDir>/
    materialsDir: z.string().regex(/^[a-z0-9-]+$/).optional(),
    materialsLabel: z.string().default('Course Materials'),
    order: z.number().default(0),
  }),
});

export const collections = {
  papers,
  projects,
  teaching,
};
