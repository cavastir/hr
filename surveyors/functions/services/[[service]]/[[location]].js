export async function onRequest({ request, next, params }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const { service, location } = params;
  
  // Check if we're at the service+location route
  if (service && location) {
    // If URL doesn't have trailing slash, add it
    if (!pathname.endsWith('/')) {
      const redirectUrl = new URL(`${pathname}/`, url);
      return Response.redirect(redirectUrl.toString(), 301);
    }
    
    // Important: Just continue to serve the page without additional checks
    // The static files should exist if they were properly generated
    return next();
  }
  
  // Only handle redirects from non-trailing to trailing slash
  // Don't attempt to process pages with trailing slash
  if (pathname.endsWith('/')) {
    return next();
  }
  
  // Only redirect URLs without trailing slash
  const redirectUrl = new URL(`${pathname}/`, url);
  return Response.redirect(redirectUrl.toString(), 301);
} 