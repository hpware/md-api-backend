import genSlug from "../../components/genSlug";

export default defineEventHandler(async (event) => {
  const slug = await genSlug(6);
  return {
    slug: slug,
  };
});
