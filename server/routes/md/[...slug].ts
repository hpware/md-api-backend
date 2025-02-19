import genSlug from "../../../components/genSlug";


export default defineEventHandler((event) => {
    return {
        slug: genSlug(5),
    }
})