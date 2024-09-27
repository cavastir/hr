import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const servicesPerPage = 4;

  const allServices = await getCollection('services');
  const startIndex = (page - 1) * servicesPerPage;
  const endIndex = startIndex + servicesPerPage;
  const paginatedServices = allServices.slice(startIndex, endIndex);

  return new Response(JSON.stringify(paginatedServices), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};