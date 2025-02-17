'use client'

import React from "react";
import styles from './MovieView.module.scss';
import Image from "next/image";
import {Movie} from "@/helpers/movieApi";
import SpaceRating from "@/components/SpaceRating/SpaceRating";
import {Fragment_Mono} from "next/font/google";
import classNames from "classnames";

const fragmentMono = Fragment_Mono({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
});

interface MovieViewProps {
    movie: Movie;
}


const MovieView: React.FC<MovieViewProps> = ({movie}) => {

    const formatRating = (rating: number) => {
        return (Math.round(rating * 10) / 10).toFixed(1);
    };

    const formattedRating = formatRating(movie.imdb_rating);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {movie.poster && (
                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        width={212}
                        height={320}
                        className={styles.image}
                    />
                )}
                <div className={styles.detailsWrapper}>
                    <div className={styles.titleWrapper}>
                        <div
                            className={classNames(fragmentMono.className, styles.title)}>{movie.title} ({formattedRating})
                        </div>
                        <div className={styles.rating}>
                            <SpaceRating name="half-rating-read" defaultValue={movie.imdb_rating} precision={0.1}
                                         max={10}
                                         readOnly/></div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detail}>{new Date(movie.released_on).getFullYear()}</div>
                        <div className={styles.detail}>{movie.length}</div>
                        <div className={styles.detail}>
                            {Array.isArray(movie.director) ? movie.director.join(', ') : movie.director}
                        </div>
                    </div>
                    <div className={styles.detail}>Cast: {movie.cast?.join(', ')}</div>
                    <div className={styles.detail}>{movie.overview}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieView;
