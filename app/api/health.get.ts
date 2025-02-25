import supabase from "../../components/supabase";

export default defineEventHandler(async (event) => {
        try {
        const { data, error } = await supabase
            .from('health_check')
            .insert({
                status: "ok"
            })
            .select()
            .single();
        if (error) {
            throw createError({
                statusCode: Number(error.code),
                message: error.message
            })
        }
        return {
            status: 'healthy',
            error: null,
            timestamp: new Date().toISOString(),
            database: {
                status: 'connected',
            }
        };
    } catch (e) {
        return {
            status: "not healthy",
            error: e,
            timestamp: new Date().toISOString(),
            database: {
                status: "unavailable"
            }
        }
    }
});