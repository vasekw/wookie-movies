import {fetchMovies} from "@/helpers/fetchMovies";
import {Movie} from "@/helpers/fetchMovies";

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
                    <ul>
                        {movies.map(movie => (
                            <li key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
