export default defineEventHandler(async (event) => {
  return sendRedirect(
    event,
    "https://github.com/hpware/md-api-backend.git",
  );
});
