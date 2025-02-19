import { render, screen } from "@testing-library/react";
import MovieView from "../MovieView";
import { Movie } from "@/helpers/movieApi";

describe("MovieView interactions", () => {
  const mockMovie: Movie = {
    backdrop: "",
    cast: ["Actor One", "Actor Two"],
    classification: "PG-13",
    director: "Director One",
    genres: ["Action", "Drama"],
    id: "1",
    imdb_rating: 8.2,
    length: "2h 10m",
    overview: "A movie about something important.",
    poster: "/image.jpg",
    released_on: "2020-05-15T00:00:00Z",
    slug: "exciting-movie",
    title: "Exciting Movie",
  };

  it("renders movie details correctly", () => {
    render(<MovieView movie={mockMovie} />);

    expect(screen.getByText(/Exciting Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/2020/i)).toBeInTheDocument();
    expect(screen.getByText(/2h 10m/i)).toBeInTheDocument();
    expect(screen.getByText(/Director One/i)).toBeInTheDocument();
    expect(screen.getByText(/Actor One, Actor Two/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A movie about something important./i),
    ).toBeInTheDocument();
  });

  it("displays correct rating", () => {
    render(<MovieView movie={mockMovie} />);
    expect(screen.getByText(/8.2/i)).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<MovieView movie={mockMovie} />);
    const image = screen.getByAltText("Exciting Movie");
    expect(image).toBeInTheDocument();
  });
});
