import axios from 'axios';

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

const apiClient = axios.create({
    baseURL: '/api',
});

export const fetchMovies = async (): Promise<MoviesResponse> => {
    const response = await apiClient.get<MoviesResponse>('/movies');
    return response.data;
};

export const searchMovies = async (query: string): Promise<MoviesResponse> => {
    const response = await apiClient.get<MoviesResponse>('/movies', {
        params: {q: query},
    });
    return response.data;
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movies?id=${id}`);
    return response.data;
};
