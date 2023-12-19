/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import Footer from "@/components/core/footer";

it("renders Footer component unchanged", () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});
