import axios from "axios";

export type Movie = {
    backdrop: string;
    cast: string[];
    classification: string;
    director: string | string[];
    genres: string[];
    id: string;
    imdb_rating: number;
    length: string;
    overview: string;
    poster: string;
    released_on: string;
    slug: string;
    title: string;
};

export type MoviesResponse = {
    movies: Movie[];
};

const API_BASE_URL = "https://wookie.codesubmit.io";
const AUTH_HEADER = {Authorization: "Bearer Wookie2021"};

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: AUTH_HEADER,
});

export const fetchMovies = async (): Promise<MoviesResponse> => {
    const response = await apiClient.get<MoviesResponse>("/movies");
    return response.data;
};

export const searchMovies = async (query: string): Promise<MoviesResponse> => {
    const response = await apiClient.get<MoviesResponse>("/movies", {
        params: {q: query},
    });
    return response.data;
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movies/${id}`);
    return response.data;
};
