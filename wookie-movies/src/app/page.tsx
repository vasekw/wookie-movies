'use client'
import {useState, useEffect} from 'react';
import styles from "./page.module.css";
import MovieList from "@/components/MovieList/MovieList";
import MenuBar from "@/components/MenuBar/MenuBar";
import {Movie, fetchMovies} from "@/helpers/movieApi";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDefaultMovies = async () => {
            try {
                const response = await fetchMovies();
                setMovies(response.movies);
            } catch (err) {
                setError('Failed to fetch default movies.');
            }
        };
        loadDefaultMovies();
    }, []);

    if (error) {
        return (<div>{error}</div>);
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <MenuBar/>
            </header>
            <main className={styles.main}>
                <MovieList movies={movies}/>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
}
