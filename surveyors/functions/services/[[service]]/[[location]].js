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
    
    // If URL has trailing slash, ensure the page exists
    try {
      // Try to get the actual page
      const response = await next();
      
      // If response is a 404, we need to handle it
      if (response.status === 404) {
        // Redirect to fallback page or homepage
        return Response.redirect(`${url.origin}/services/`, 302);
      }
      
      return response;
    } catch (e) {
      console.error("Error in service+location function:", e);
      // Fallback to homepage on error
      return Response.redirect(`${url.origin}/`, 302);
    }
  }
  
  // For any other cases, just continue
  return next();
} 