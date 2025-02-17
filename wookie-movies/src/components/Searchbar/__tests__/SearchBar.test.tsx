import {render, screen, fireEvent} from '@testing-library/react'
import SearchBar from '../SearchBar'

it('renders SearchBar unchanged', () => {
    const {container} = render(<SearchBar onSearch={() => {
    }}/>)
    expect(container).toMatchSnapshot()
})

describe("SearchBar interactions", () => {
    it("updates input value when user types", () => {
        render(<SearchBar onSearch={() => {
        }}/>);
        const input = screen.getByTestId('SearchBar-input');

        fireEvent.change(input, {target: {value: "coffee"}});
        expect(input).toHaveValue("coffee");
    });

    it("calls onSearch when Enter key is pressed", () => {
        const mockOnSearch = jest.fn();
        render(<SearchBar onSearch={mockOnSearch}/>);
        const input = screen.getByTestId('SearchBar-input');

        fireEvent.change(input, {target: {value: "Berlin"}});
        fireEvent.keyDown(input, {key: "Enter", code: "Enter"});

        expect(mockOnSearch).toHaveBeenCalledWith("Berlin");
    });

    it("calls onSearch when search button is clicked", () => {
        const mockOnSearch = jest.fn();
        render(<SearchBar onSearch={mockOnSearch}/>);
        const input = screen.getByTestId('SearchBar-input');
        const button = screen.getByRole("button");

        fireEvent.change(input, {target: {value: "React"}});
        fireEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalledWith("React");
    });
});
