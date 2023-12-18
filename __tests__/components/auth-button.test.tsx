/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import AuthButton from "@/components/auth-button";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn<void, []>(() => Promise.resolve()),
  useSession: jest.fn(),
}));

describe("AuthButton component", () => {
  it("renders `Sign in` text when user's session not exists", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });

    const { container, getByText } = render(<AuthButton />);
    expect(container).toMatchSnapshot();
    expect(getByText("Sign in")).toBeTruthy();
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

    const { container, getByText } = render(<AuthButton />);
    expect(container).toMatchSnapshot();
    expect(getByText("Test User")).toBeTruthy();
  });

  it("should sign out when user click the sign out button", () => {
    const mockSession: Session = {
      user: { name: "Test User" },
      expires: "",
    };

    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession,
    });

    const { getByAltText } = render(<AuthButton />);
    const signOutButton = getByAltText("logout");
    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
