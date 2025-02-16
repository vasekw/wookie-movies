'use client'

import React, {useEffect, useState} from "react";
import styles from './MovieView.module.scss';
import Image from "next/image";
import {Movie, fetchMovieById} from "@/helpers/movieApi";
import {Rating, Skeleton} from "@mui/material";

interface MovieViewProps {
    id: string;
}


const MovieView: React.FC<MovieViewProps> = ({id}) => {
    const [movie, setMovie] = useState<Movie | null>(null);

    const formatRating = (rating: number) => {
        return (Math.round(rating * 10) / 10).toFixed(1);
    };

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
        return (
            <div className={styles.wrapper}>
                <Skeleton variant="rectangular" width={212} height={320} className={styles.image}/>
                <div className={styles.detailsWrapper}>
                    <div className={styles.titleWrapper}>
                        <Skeleton variant="text" width={200} height={30}/>
                        <Skeleton variant="text" width={50} height={30}/>
                    </div>
                    <div className={styles.detailRow}>
                        <Skeleton variant="text" width={50} height={20}/>
                        <Skeleton variant="text" width={50} height={20}/>
                        <Skeleton variant="text" width={100} height={20}/>
                    </div>
                    <Skeleton variant="text" width={300} height={20}/>
                    <Skeleton variant="text" width={350} height={60}/>
                </div>
            </div>
        );
    }

    const formattedRating = formatRating(movie.imdb_rating);


    return (
        <div className={styles.wrapper}>
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
                    <div className={styles.title}>{movie.title} ({formattedRating})</div>
                    <div className={styles.rating}>
                        <Rating name="half-rating-read" defaultValue={movie.imdb_rating} precision={0.1} max={10}
                                readOnly/></div>
                </div>
                <div className={styles.detailRow}>
                    <div className={styles.detail}>{new Date(movie.released_on).getFullYear()}</div>
                    <div className={styles.detail}>{movie.length}</div>
                    <div className={styles.detail}>{movie.director}</div>
                </div>
                <div className={styles.detail}>Cast: {movie.cast?.join(', ')}</div>
                <div className={styles.detail}>{movie.overview}</div>
            </div>
        </div>
    );
};

export default MovieView;
