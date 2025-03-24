export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Special handling for service+location routes (highest priority)
  if (pathname.startsWith('/services/') && pathname.split('/').length > 3 && !pathname.endsWith('/')) {
    // This is a service/location route without trailing slash
    const redirectUrl = new URL(`${pathname}/`, url);
    redirectUrl.search = url.search;
    return Response.redirect(redirectUrl.toString(), 301);
  }
  
  // Check if the URL doesn't have a trailing slash and doesn't contain a file extension
  if (!pathname.endsWith('/') && !pathname.includes('.') && pathname !== '') {
    // Create the redirect URL with trailing slash
    const redirectUrl = new URL(`${pathname}/`, url);
    
    // Preserve query parameters
    redirectUrl.search = url.search;
    
    // Return a 301 redirect response
    return Response.redirect(redirectUrl.toString(), 301);
  }
  
  // Continue to the next middleware or to the static assets
  return next();
} 