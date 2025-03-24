export async function onRequest({ request, next, params }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Only handle redirects for URLs without trailing slashes
  if (!pathname.endsWith('/')) {
    const redirectUrl = new URL(`${pathname}/`, url);
    return Response.redirect(redirectUrl.toString(), 301);
  }
  
  // Let static file handling take priority for pages with trailing slashes
  return next();
} 