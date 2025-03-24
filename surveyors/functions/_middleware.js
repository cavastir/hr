export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Only handle trailing slashes for non-file paths
  if (!pathname.includes('.') && !pathname.endsWith('/')) {
    const redirectUrl = new URL(`${pathname}/`, url);
    redirectUrl.search = url.search;
    return Response.redirect(redirectUrl.toString(), 301);
  }
  
  // Continue to the next middleware or to the static assets
  return next();
} 