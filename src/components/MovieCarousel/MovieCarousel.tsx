"use client";

import React, { useRef, useCallback } from "react";
import styles from "./MovieCarousel.module.scss";
import { Movie } from "@/helpers/movieApi";
import Image from "next/image";
import { Fragment_Mono } from "next/font/google";
import classNames from "classnames";

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div
      data-testid="MovieCarousel-wrapper"
      className={styles.wrapper}
      ref={carouselRef}
      onScroll={handleScroll}
    >
      <div data-testid="MovieCarousel" className={styles.swiper}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.swiperSlide}>
            <a href={`?movie=${movie.id}`}>
              <Image
                data-testid={`MovieCarousel-image-${movie.id}`}
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

export default MovieCarousel;
