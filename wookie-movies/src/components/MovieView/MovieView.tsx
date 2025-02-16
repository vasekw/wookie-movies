'use client'

import React, {useEffect, useState} from "react";
import styles from './MovieView.module.scss';
import Image from "next/image";
import {Movie, fetchMovieById} from "@/helpers/movieApi";

interface MovieViewProps {
    id: string;
}

const MovieView: React.FC<MovieViewProps> = ({id}) => {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await fetchMovieById(id);
                setMovie(response)

            } catch (error) {
                console.error("Failed to fetch movie:", error);
            }
        };

        getMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.wrapper}>
            {movie.poster && (
                <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={80}
                    height={80}
                    unoptimized
                />
            )}
            <div className={styles.detailsWrapper}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>{movie.title}</div>
                    <div className={styles.rating}></div>
                </div>
                <div className={styles.details}>{movie.released_on}</div>
                <div className={styles.details}>{movie.cast?.join(', ')}</div>
                <div className={styles.details}>{movie.overview}</div>
            </div>
        </div>
    );
};

export default MovieView;
