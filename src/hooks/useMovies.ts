import { useState, useEffect } from "react";
import {
  fetchMovies,
  searchMovies,
  fetchMovieById,
  Movie,
} from "@/helpers/movieApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams } from "next/navigation";

const SEARCH_DEBOUNCE_TIME = 500;

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const movie = searchParams.get("movie") || "";
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_TIME);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        if (movie) {
          const response = await fetchMovieById(movie);
          setMovieData(response);
          setMovies([]);
        } else if (debouncedQuery) {
          const response = await searchMovies(debouncedQuery);
          setMovies(response.movies);
          setMovieData(null);
        } else {
          const response = await fetchMovies();
          setMovies(response.movies);
          if (!movie) {
            setMovieData(null);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch content.");
        setMovies([]);
        setMovieData(null);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [debouncedQuery, movie]);

  return { movies, movieData, error, loading, debouncedQuery };
};
