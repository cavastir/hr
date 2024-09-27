import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    services: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    }))
  }),
});

export const collections = {
  'services': servicesCollection,
};