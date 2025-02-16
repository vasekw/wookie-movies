import {fetchMovies, Movie} from "@/helpers/movieApi";
import styles from './MovieList.module.scss'
import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";

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

const MovieList = async () => {
    let movies: Movie[] = [];
    let error: string | null = null;

    try {
        const response = await fetchMovies();
        movies = response.movies;
    } catch (err) {
        error = 'Failed to fetch movies.';
    }

    if (error) return <p>{error}</p>;

    const groupedMovies = groupMoviesByGenre(movies);

    return (
        <div>
            {Object.entries(groupedMovies).map(([genre, movies]) => (
                <div key={genre}>
                    <h2>{genre}</h2>
                    <MovieCarousel movies={movies}/>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
