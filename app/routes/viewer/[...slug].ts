export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, "slug");
    return sendRedirect(
      event,
      `https://mdviewer.yuanhau.com/?u=https://md-api-backend.vercel.app/${slug}`,
    );
  });
  