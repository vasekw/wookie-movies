import {NextResponse} from 'next/server';
import axios, {AxiosError} from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
const AUTH_HEADER = {Authorization: `Bearer ${process.env.API_ACCESS_KEY}`};

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: AUTH_HEADER,
});

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const query = searchParams.get('q') || '';
    const movieId = searchParams.get('id') || '';

    const endpoint = movieId ? `/movies/${movieId}` : '/movies';
    const params = query ? {q: query} : undefined;

    try {
        const response = await axiosInstance.get(endpoint, {params});
        return NextResponse.json(response.data);
    } catch (err) {
        const errorMessage = (err instanceof AxiosError && err.response?.data?.message) || 'Failed to fetch movies';
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}
