import axios, {AxiosResponse} from "axios";

const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${process.env.API_ACCESS_KEY}`,
    },
});

export const apiRequest = async <T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any, params?: Record<string, any>
): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient({
        method,
        url,
        data,
        params
    });

    return response.data;
};