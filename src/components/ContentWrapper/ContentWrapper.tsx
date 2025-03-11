"use client";

import React from "react";
import styles from "./ContentWrapper.module.scss";
import { CircularProgress } from "@mui/material";
import MovieList from "@/components/MovieList/MovieList";
import NoResults from "@/components/NoResults/NoResults";
import MovieView from "@/components/MovieView/MovieView";
import { useMovies } from "@/hooks/useMovies";

const ContentWrapper: React.FC = () => {
  const { movies, movieData, error, loading, debouncedQuery } = useMovies();

  if (error) {
    return (
      <div data-testid="ContentWrapper-error" className={styles.error}>
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <div>
      {movieData ? (
        <MovieView movie={movieData} />
      ) : movies.length > 0 ? (
        <MovieList movies={movies} isSearch={!!debouncedQuery} />
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default ContentWrapper;
