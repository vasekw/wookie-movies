import { render, screen, waitFor } from "@testing-library/react";
import ContentWrapper from "../ContentWrapper";
import * as movieApi from "@/helpers/movieApi";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/helpers/movieApi";
import { act } from "react";

jest.mock("@/helpers/movieApi");

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

const mockMovie: Movie = {
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

describe("ContentWrapper", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const searchMoviesMock = (
    movieApi.searchMovies as jest.Mock
  ).mockResolvedValue({ movies: [mockMovie] });

  const fetchMoviesMock = (movieApi.fetchMovies as jest.Mock).mockResolvedValue(
    { movies: [] },
  );

  const getMovieMock = (movieApi.fetchMovieById as jest.Mock).mockResolvedValue(
    { mockMovie },
  );

  it("should show loading state while fetching data", async () => {
    const searchMoviesMock = (
      movieApi.searchMovies as jest.Mock
    ).mockResolvedValueOnce(
      new Promise((resolve) => setTimeout(() => resolve({ movies: [] }), 2000)),
    );

    const mockSearchParams = new URLSearchParams({ q: "1" });
    (useSearchParams as jest.Mock).mockImplementation(() => mockSearchParams);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<ContentWrapper />);
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(searchMoviesMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(fetchMoviesMock).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getMovieMock).toHaveBeenCalledTimes(0));
  });

  it("should display an error message if fetching fails", async () => {
    const mockSearchParams = new URLSearchParams({ q: "1" });
    (useSearchParams as jest.Mock).mockImplementation(() => mockSearchParams);

    (movieApi.searchMovies as jest.Mock).mockRejectedValue(
      new Error("API error"),
    );

    render(<ContentWrapper />);

    await waitFor(() => {
      expect(screen.getByTestId("ContentWrapper-error")).toBeInTheDocument();
    });
    expect(searchMoviesMock).toHaveBeenCalledTimes(1);
    expect(fetchMoviesMock).toHaveBeenCalledTimes(0);
    expect(getMovieMock).toHaveBeenCalledTimes(0);
  });

  it("should display movie view if movie query exists", async () => {
    const mockSearchParams = new URLSearchParams({ movie: "1" });
    (useSearchParams as jest.Mock).mockImplementation(() => mockSearchParams);

    const getMovieMock = (movieApi.fetchMovieById as jest.Mock).mockResolvedValue(
    { mockMovie },
  );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<ContentWrapper />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("MovieView")).toBeInTheDocument();
    });
    expect(searchMoviesMock).toHaveBeenCalledTimes(0);
    expect(fetchMoviesMock).toHaveBeenCalledTimes(0);
    expect(getMovieMock).toHaveBeenCalledTimes(1);
  });

  it("should display carousel view if no query exists", async () => {
    const mockSearchParams = new URLSearchParams({});
    (useSearchParams as jest.Mock).mockImplementation(() => mockSearchParams);

    const fetchMoviesMock = (
      movieApi.fetchMovies as jest.Mock
    ).mockResolvedValue({
      movies: [mockMovie],
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<ContentWrapper />);
    });
    await waitFor(() => {
      expect(screen.getByTestId("MovieList")).toBeInTheDocument();
    });
    expect(searchMoviesMock).toHaveBeenCalledTimes(0);
    expect(fetchMoviesMock).toHaveBeenCalledTimes(1);
    expect(getMovieMock).toHaveBeenCalledTimes(0);
  });
});
