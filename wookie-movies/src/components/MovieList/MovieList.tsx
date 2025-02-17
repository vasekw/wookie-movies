import styles from "./MovieList.module.scss";
import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";
import React from "react";
import { Movie } from "@/helpers/movieApi";
import { Bungee_Hairline } from "next/font/google";
import classNames from "classnames";

export const bungeeHairline = Bungee_Hairline({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const groupMoviesByGenre = (movies: Movie[]) => {
  return movies.reduce<Record<string, Movie[]>>((acc, movie) => {
    movie.genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(movie);
    });
    return acc;
  }, {});
};

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const groupedMovies = groupMoviesByGenre(movies);

  return (
    <div>
      {Object.entries(groupedMovies).map(([genre, movies]) => (
        <div key={genre}>
          <div
            data-testid={`MovieList-${genre}-title`}
            className={classNames(styles.title, bungeeHairline.className)}
          >
            {genre}
          </div>
          <MovieCarousel movies={movies} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
