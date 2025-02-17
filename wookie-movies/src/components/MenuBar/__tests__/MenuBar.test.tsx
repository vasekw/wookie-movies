import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import MenuBar from "../MenuBar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("MenuBar", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it("should render the MenuBar with Logo and SearchBar components", () => {
    render(<MenuBar />);

    expect(screen.getByTestId("Logo")).toBeInTheDocument();
    expect(screen.getByTestId("SearchBar")).toBeInTheDocument();
  });

  it("should call router.push with the correct search query when onSearch is triggered", () => {
    render(<MenuBar />);

    const input = screen.getByTestId("SearchBar-input");

    fireEvent.change(input, { target: { value: "test" } });

    expect(pushMock).toHaveBeenCalledWith("?q=test");
  });

  it("renders MenuBar unchanged", () => {
    const { container } = render(<MenuBar />);
    expect(container).toMatchSnapshot();
  });
});
