/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import NavBar from "@/components/navbar";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("NavBar component", () => {
  it("renders `Sign in` button when user's session not exists", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });

    const { container, getByText } = render(<NavBar />);
    expect(container).toMatchSnapshot();
    expect(getByText('Sign in')).toBeTruthy();
  });

  it("renders logged-in user's info when user's session exists", () => {
    const mockSession: Session = {
      user: { name: "Test User" },
      expires: "",
    };

    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession,
    });

    const { container, getByText } = render(<NavBar />);
    expect(container).toMatchSnapshot();
    expect(getByText('Test User')).toBeTruthy();
  });
});
