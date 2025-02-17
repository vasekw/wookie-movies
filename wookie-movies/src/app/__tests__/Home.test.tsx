import {render, screen} from "@testing-library/react";
import Home from "../page";

jest.mock("@/components/MenuBar/MenuBar", () => ({
    __esModule: true,
    default: () => <div>MenuBar</div>,
}));

jest.mock("@/components/ContentWrapper/ContentWrapper", () => ({
    __esModule: true,
    default: () => <div>ContentWrapper</div>,
}));

describe("Home Component", () => {
    test("renders MenuBar and ContentWrapper", () => {
        render(<Home/>);

        expect(screen.getByText("MenuBar")).toBeInTheDocument();
        expect(screen.getByText("ContentWrapper")).toBeInTheDocument();
    });

    test("has correct structure", () => {
        render(<Home/>);
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("main")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});
