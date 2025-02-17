import { render } from "@testing-library/react";
import NoResults from "../NoResults";

it("renders NoResults unchanged", () => {
  const { container } = render(<NoResults />);
  expect(container).toMatchSnapshot();
});
