"use client";

import React from "react";
import styles from "./MovieGrid.module.scss";
import { Movie } from "@/helpers/movieApi";
import Image from "next/image";
import { Fragment_Mono } from "next/font/google";
import classNames from "classnames";

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <div data-testid="MovieGrid" className={styles.wrapper}>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.gridItem}>
            <a href={`?movie=${movie.id}`}>
              <Image
                src={movie.poster}
                alt={movie.title}
                width={240}
                height={360}
              />
              <div
                className={classNames(fragmentMono.className, styles.overlay)}
              >
                {movie.title}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
