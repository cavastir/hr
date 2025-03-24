export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Check if this is a service+location path
  const pathParts = pathname.split('/').filter(Boolean);
  const isServiceLocationPath = 
    pathParts.length >= 3 && 
    pathParts[0] === 'services' &&
    ['drone-surveying', 'engineering-surveying', 'land-surveying'].includes(pathParts[1]) &&
    ['melbourne', 'perth', 'brisbane', 'adelaide', 'geelong'].includes(pathParts[2]);
  
  // Skip middleware processing for service+location paths
  if (isServiceLocationPath) {
    return next();
  }
  
  // Handle trailing slash for other URLs
  if (!pathname.endsWith('/') && !pathname.includes('.') && pathname !== '') {
    const redirectUrl = new URL(`${pathname}/`, url);
    redirectUrl.search = url.search;
    return Response.redirect(redirectUrl.toString(), 301);
  }
  
  return next();
} 