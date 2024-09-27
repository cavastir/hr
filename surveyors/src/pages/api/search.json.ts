import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.toLowerCase() || '';
  const servicesEntry = (await getCollection('services'))[0];
  
  const results = servicesEntry.data.services.filter((service) => 
    service.title.toLowerCase().includes(query) || 
    service.description.toLowerCase().includes(query)
  );

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};