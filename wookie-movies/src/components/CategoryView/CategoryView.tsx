'use client'

import React, {useEffect, useState} from "react";
import styles from "./CategoryView.module.scss";
import {fetchMovies, Movie, searchMovies} from "@/helpers/movieApi";
import {useSearchParams} from "next/navigation";
import MovieList from "@/components/MovieList/MovieList";
import NoResults from "@/components/NoResults/NoResults";


const CategoryView: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                if (query) {
                    const response = await searchMovies(query);
                    setMovies(response.movies);
                } else {
                    const response = await fetchMovies();
                    setMovies(response.movies);
                }
            } catch {
                setError('Failed to fetch movies.');
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [query]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {loading ? (
                <div className={styles.loading}>Loading movies...</div>
            ) : movies.length > 0 ? (
                <MovieList movies={movies}/>
            ) : (
                !loading && (
                    <NoResults/>
                )
            )}
        </div>
    );
};

export default CategoryView;
