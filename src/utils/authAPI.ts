import axios, { type AxiosInstance } from "axios";

const authAPI: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_JIRA_URL,
    withCredentials: true,
});

authAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        }
        return Promise.reject(error);
    }
);

export default authAPI;
