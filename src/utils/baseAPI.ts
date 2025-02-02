import axios, { type AxiosInstance } from 'axios';

const baseAPI: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_JIRA_URL
});

export default baseAPI;