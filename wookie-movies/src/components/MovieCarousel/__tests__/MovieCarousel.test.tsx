import {render, screen} from '@testing-library/react';
import MovieCarousel from "../MovieCarousel";
import {Movie} from "@/helpers/movieApi";


jest.mock("next/image", () => {
    // eslint-disable-next-line react/display-name
    return ({src, alt, width, height}: never) => (
        <img src={src} alt={alt} width={width} height={height}/>
    );
});

export const mockMovies: Movie[] = [
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
    {
        backdrop: "",
        cast: ["Actor Five", "Actor Six"],
        classification: "PG",
        director: "Director Three",
        genres: ["Comedy"],
        id: "3",
        imdb_rating: 6.8,
        length: "1h 40m",
        overview: "A hilarious journey through unexpected events.",
        poster: "/image3.jpg",
        released_on: "2021-03-10T00:00:00Z",
        slug: "comedy-movie",
        title: "Comedy Movie",
    },
    {
        backdrop: "",
        cast: ["Actor Seven", "Actor Eight"],
        classification: "NC-17",
        director: "Director Four",
        genres: ["Horror"],
        id: "4",
        imdb_rating: 7.9,
        length: "2h 5m",
        overview: "A terrifying story of supernatural forces.",
        poster: "/image4.jpg",
        released_on: "2018-11-23T00:00:00Z",
        slug: "horror-movie",
        title: "Horror Movie",
    },
    {
        backdrop: "",
        cast: ["Actor Nine", "Actor Ten"],
        classification: "PG-13",
        director: "Director Five",
        genres: ["Romance", "Drama"],
        id: "5",
        imdb_rating: 8.4,
        length: "2h 30m",
        overview: "A heartfelt love story that spans across years.",
        poster: "/image5.jpg",
        released_on: "2022-07-05T00:00:00Z",
        slug: "romance-movie",
        title: "Romance Movie",
    },
    {
        backdrop: "",
        cast: ["Actor Eleven", "Actor Twelve"],
        classification: "PG-13",
        director: "Director Six",
        genres: ["Sci-Fi", "Action"],
        id: "6",
        imdb_rating: 9.1,
        length: "2h 20m",
        overview: "A futuristic tale of survival on an alien planet.",
        poster: "/image6.jpg",
        released_on: "2024-01-15T00:00:00Z",
        slug: "scifi-movie",
        title: "Sci-Fi Movie",
    },
    {
        backdrop: "",
        cast: ["Actor Thirteen", "Actor Fourteen"],
        classification: "R",
        director: "Director Seven",
        genres: ["Thriller", "Crime"],
        id: "7",
        imdb_rating: 7.3,
        length: "1h 50m",
        overview: "A gripping crime thriller that will keep you on edge.",
        poster: "/image7.jpg",
        released_on: "2020-10-18T00:00:00Z",
        slug: "thriller-movie",
        title: "Thriller Movie",
    },
    {
        backdrop: "",
        cast: ["Actor Fifteen", "Actor Sixteen"],
        classification: "G",
        director: "Director Eight",
        genres: ["Animation", "Adventure"],
        id: "8",
        imdb_rating: 8.0,
        length: "1h 30m",
        overview: "An animated adventure that takes the viewer on a magical journey.",
        poster: "/image8.jpg",
        released_on: "2017-12-20T00:00:00Z",
        slug: "animation-movie",
        title: "Animation Movie",
    },
];


describe("MovieCarousel Component", () => {

    it("renders the correct number of movies", () => {
        render(<MovieCarousel movies={mockMovies}/>);
        expect(screen.getAllByTestId("MovieCarousel")).toHaveLength(1);
        expect(screen.getAllByRole("link")).toHaveLength(mockMovies.length);
    });

    it("displays movie posters with correct alt text", () => {
        render(<MovieCarousel movies={mockMovies}/>);
        mockMovies.forEach(movie => {
            const image = screen.getByAltText(movie.title);
            expect(image).toHaveAttribute("src", movie.poster);
            expect(image).toHaveAttribute("alt", movie.title);
        });
    });

    it("applies the correct overlay text for each movie", () => {
        render(<MovieCarousel movies={mockMovies}/>);
        mockMovies.forEach(movie => {
            const overlay = screen.getByText(movie.title);
            expect(overlay).toBeInTheDocument();
        });
    });
});
