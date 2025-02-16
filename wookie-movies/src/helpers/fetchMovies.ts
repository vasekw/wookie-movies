import {apiRequest} from "@/helpers/apiClient";

export type Movie = {
    backdrop: string;
    cast: string[];
    classification: string;
    director: string;
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

export const fetchMovies = async (search_term?: string): Promise<MoviesResponse> => {
    return await apiRequest<MoviesResponse>('/movies', 'GET', undefined, search_term ? {q: search_term} : undefined
    )
}