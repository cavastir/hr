import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'data',
  schema: z.object({
    services: z.array(z.object({
      title: z.string(),
      icon: z.string(),
      shortDesc: z.string(),
      longDesc: z.string()
    }))
  })
});

export const collections = {
  articles: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.string(),
      author: z.string().optional(),
      location: z.string().optional(),
      image: z.string().optional(),
      category: z.string().optional(),
    })
  })
};