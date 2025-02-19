"use client";

import React, { useEffect, useState } from "react";
import styles from "./ContentWrapper.module.scss";
import {
  fetchMovies,
  Movie,
  searchMovies,
  fetchMovieById,
} from "@/helpers/movieApi";
import { useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import MovieList from "@/components/MovieList/MovieList";
import NoResults from "@/components/NoResults/NoResults";
import MovieView from "@/components/MovieView/MovieView";

const SEARCH_DEBOUNCE_TIME = 500;

const ContentWrapper: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const movie = searchParams.get("movie") || "";

  useEffect(() => {
    setIsQuerying(true);

    setError(null);

    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, SEARCH_DEBOUNCE_TIME);

    return () => clearTimeout(handler);
  }, [query, movie]);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        if (movie) {
          setIsQuerying(false);
          const response = await fetchMovieById(movie);
          setMovieData(response);
        } else if (debouncedQuery) {
          setIsQuerying(false);
          const response = await searchMovies(debouncedQuery);
          setMovies(response.movies);
          setMovieData(null);
        } else if (!query) {
          setIsQuerying(false);
          const response = await fetchMovies();
          setMovies(response.movies);
          setMovieData(null);
        }
      } catch {
        setError("Failed to fetch content.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [debouncedQuery, movie]);

  if (error) {
    return (
      <div data-testid="ContentWrapper-error" className={styles.error}>
        {error}
      </div>
    );
  }

  const shouldRenderLoading = loading || isQuerying;

  return (
    <div>
      {shouldRenderLoading ? (
        <div className={styles.loading}>
          <CircularProgress size={80} />
        </div>
      ) : movieData ? (
        <MovieView movie={movieData} />
      ) : movies.length > 0 ? (
        <MovieList movies={movies} isSearch={!!debouncedQuery} />
      ) : (
        !loading && !isQuerying && <NoResults />
      )}
    </div>
  );
};

export default ContentWrapper;
