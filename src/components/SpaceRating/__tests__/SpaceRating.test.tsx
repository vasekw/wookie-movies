import { render } from "@testing-library/react";
import SpaceRating from "../SpaceRating";

it("renders SpaceRating unchanged", () => {
  const { container } = render(
    <SpaceRating name={"test"} max={10} defaultValue={5} precision={0.1} />,
  );
  expect(container).toMatchSnapshot();
});
