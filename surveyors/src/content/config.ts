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

export const collections = { services };