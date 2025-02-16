import styles from './MovieList.module.scss';
import classNames from 'classnames';
import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";
import {monoton} from "@/app/fonts";
import React from "react";
import {Movie} from "@/helpers/movieApi";

const groupMoviesByGenre = (movies: Movie[]) => {
    return movies.reduce<Record<string, Movie[]>>((acc, movie) => {
        movie.genres.forEach(genre => {
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


const MovieList: React.FC<MovieListProps> = ({movies}) => {


    const groupedMovies = groupMoviesByGenre(movies);

    return (
        <div>
            {Object.entries(groupedMovies).map(([genre, movies]) => (
                <div key={genre}>
                    <div className={classNames(monoton.className, styles.title)}>{genre}</div>
                    <MovieCarousel movies={movies}/>
                </div>
            ))}
        </div>
    );
};

export default MovieList;