export default defineEventHandler(async (event) => {
  return sendRedirect(event, "https://md.yhw.tw/create");
})