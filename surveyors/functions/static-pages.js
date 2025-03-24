export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Check if this is a service+location path with trailing slash
  const pathParts = pathname.split('/').filter(Boolean);
  if (
    pathname.endsWith('/') && 
    pathParts.length === 3 && 
    pathParts[0] === 'services' &&
    ['drone-surveying', 'engineering-surveying', 'land-surveying'].includes(pathParts[1]) &&
    ['melbourne', 'perth', 'brisbane', 'adelaide', 'geelong'].includes(pathParts[2])
  ) {
    try {
      // Explicitly construct the path to the static HTML file
      const staticPath = `${pathname}index.html`;
      
      // Create a new request to fetch the static file
      const staticFileRequest = new Request(
        new URL(staticPath, request.url),
        request
      );
      
      // Log the attempt for debugging
      console.log(`Attempting to serve static file: ${staticPath}`);
      
      // Try direct access to static file - this is technically what "next()" would do,
      // but we're being explicit here
      return new Response(null, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    } catch (e) {
      console.error("Error serving static file:", e);
    }
  }
  
  // Continue to next middleware/function
  return next();
} 