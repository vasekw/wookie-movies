'use client';

import React from 'react';
import styles from './MovieCarousel.module.scss'
import {Movie} from "@/helpers/movieApi";
import Image from "next/image";

interface MovieCarouselProps {
    movies: Movie[]
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({movies}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.swiper}>
                {movies.map(movie => (
                    <div key={movie.id} className={styles.swiperSlide}>
                        <a href={`movie/${movie.id}`}>
                            <Image src={movie.poster} alt={movie.title} width={100} height={100}/>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCarousel;
