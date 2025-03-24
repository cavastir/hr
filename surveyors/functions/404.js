export async function onRequest({ request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Check if this is a service+location URL that doesn't exist
  if (pathname.startsWith('/services/') && pathname.split('/').length > 3) {
    const pathParts = pathname.split('/').filter(Boolean);
    
    // Extract service and location
    const service = pathParts[1]; // 'drone-surveying'
    const location = pathParts[2]; // 'melbourne'
    
    // List of valid services and locations
    const validServices = ['drone-surveying', 'engineering-surveying', 'land-surveying'];
    const validLocations = ['melbourne', 'perth', 'brisbane', 'adelaide', 'geelong'];
    
    // If service is valid but location isn't, redirect to service page
    if (validServices.includes(service) && !validLocations.includes(location)) {
      return Response.redirect(`${url.origin}/services/${service}/`, 302);
    }
    
    // If location is valid but service isn't, redirect to location page
    if (!validServices.includes(service) && validLocations.includes(location)) {
      return Response.redirect(`${url.origin}/${location}/`, 302);
    }
    
    // If neither is valid, redirect to services page
    return Response.redirect(`${url.origin}/services/`, 302);
  }
  
  // Return the regular 404 page
  return new Response("Not Found", { status: 404 });
} 