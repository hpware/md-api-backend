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
            return {
                status: "not healthy",
                timestamp: new Date().toISOString(),
                database: {
                    status: "unavailable"
                }
            }
        }
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            database: {
                status: 'connected',
            }
        };

    } catch (err) {
        console.error('Health check failed:', err);
        return {
            status: "not healthy",
            timestamp: new Date().toISOString(),
            database: {
                status: "unavailable"
            }
        }
    }
});