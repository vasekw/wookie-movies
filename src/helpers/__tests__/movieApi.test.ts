import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fetchMovies,
  searchMovies,
  fetchMovieById,
  Movie,
} from "@/helpers/movieApi";

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

const mockSingleMovie: Movie = {
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
};

const server = setupServer(
  rest.get("/api/movies", (req, res, ctx) => {
    const movieId = req.url.searchParams.get("id");
    const searchQuery = req.url.searchParams.get("q");

    if (movieId) {
      const movie = mockMovies.find((m) => m.id === movieId);
      return res(ctx.json(movie ? movie : {}));
    }

    if (searchQuery) {
      const filteredMovies = mockMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return res(ctx.json({ movies: filteredMovies }));
    }

    return res(ctx.json({ movies: mockMovies }));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

it("should return a list of movies when GET is called on /api/movies", async () => {
  const movieData = await fetchMovies();
  expect(movieData).toEqual({ movies: mockMovies });
});

it("should return movies filtered by search query when GET is called on /api/movies?q=query", async () => {
  const searchQuery = "Action";
  const movieData = await searchMovies(searchQuery);
  expect(movieData).toEqual({ movies: [mockMovies[0]] });
});

it("should return a single movie by ID when GET is called on /api/movies?id=id", async () => {
  const movieId = "1";
  const movieData = await fetchMovieById(movieId);
  expect(movieData).toEqual(mockSingleMovie);
});
