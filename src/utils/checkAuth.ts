import authAPI from "@/utils/authAPI.ts";

const checkAuth = async () => {
    try {
        await authAPI.get('/sync');
        return true;
    } catch (error: any) {
        return false;
    }
};


export {
    checkAuth,
}

