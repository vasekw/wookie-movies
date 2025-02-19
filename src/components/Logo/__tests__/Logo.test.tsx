import { render } from "@testing-library/react";
import Logo from "../Logo";

it("renders Logo unchanged", () => {
  const { container } = render(<Logo />);
  expect(container).toMatchSnapshot();
});
