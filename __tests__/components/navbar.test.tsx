/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

it("renders NavBar component unchanged", () => {
  (useSession as jest.Mock).mockReturnValue({
    status: "unauthenticated",
    data: null,
  });
  const { container } = render(<NavBar />);
  expect(container).toMatchSnapshot();
});
