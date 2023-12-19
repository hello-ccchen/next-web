/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import NotFound from "@/app/not-found";

it("renders not-found page unchanged", () => {
  const { container } = render(<NotFound />);
  expect(container).toMatchSnapshot();
});
