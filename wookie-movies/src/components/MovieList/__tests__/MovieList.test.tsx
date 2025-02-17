import {render, screen} from "@testing-library/react";
import MovieList, {groupMoviesByGenre} from "../MovieList";
import {Movie} from "@/helpers/movieApi";

describe("MovieList Component", () => {
    const mockMovies: Movie[] = [
        {
            backdrop: "",
            cast: ["Actor One", "Actor Two"],
            classification: "PG-13",
            director: "Director One",
            genres: ["Action"],
            id: "1",
            imdb_rating: 8.2,
            length: "2h 10m",
            overview: "An action-packed adventure.",
            poster: "/image1.jpg",
            released_on: "2020-05-15T00:00:00Z",
            slug: "action-movie",
            title: "Action Movie",
        },
        {
            backdrop: "",
            cast: ["Actor Three", "Actor Four"],
            classification: "R",
            director: "Director Two",
            genres: ["Drama"],
            id: "2",
            imdb_rating: 7.5,
            length: "1h 50m",
            overview: "A dramatic tale of life and love.",
            poster: "/image2.jpg",
            released_on: "2019-08-21T00:00:00Z",
            slug: "drama-movie",
            title: "Drama Movie",
        },
    ];

    it("groups movies by genre correctly", () => {
        const groupedMovies = groupMoviesByGenre(mockMovies);
        expect(groupedMovies).toHaveProperty("Action");
        expect(groupedMovies).toHaveProperty("Drama");
        expect(groupedMovies["Action"].length).toBe(1);
        expect(groupedMovies["Drama"].length).toBe(1);
    });

    it("renders movie genres as titles", () => {
        render(<MovieList movies={mockMovies}/>);
        expect(screen.getByTestId('MovieList-Action-title')).toHaveTextContent('Action');
        expect(screen.getByTestId('MovieList-Drama-title')).toHaveTextContent('Drama');
    });

    it("renders MovieCarousel component for each genre", () => {
        render(<MovieList movies={mockMovies}/>);
        expect(screen.getAllByTestId('MovieCarousel')).toHaveLength(2);
    });

    it("matches the snapshot", () => {
        const {asFragment} = render(<MovieList movies={mockMovies}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
