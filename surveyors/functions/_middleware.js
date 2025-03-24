export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Check if this is a service+location path with trailing slash - skip middleware
  const pathParts = pathname.split('/').filter(Boolean);
  if (
    pathname.endsWith('/') && 
    pathParts.length === 3 && 
    pathParts[0] === 'services' &&
    ['drone-surveying', 'engineering-surveying', 'land-surveying'].includes(pathParts[1]) &&
    ['melbourne', 'perth', 'brisbane', 'adelaide', 'geelong'].includes(pathParts[2])
  ) {
    // Let static file handling take priority for these paths
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