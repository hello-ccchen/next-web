/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import AuthButton from "@/components/core/auth-button";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn<void, []>(() => Promise.resolve()),
  useSession: jest.fn(),
}));

describe("AuthButton component", () => {
  it("renders `Sign in` text when user's session not exists", () => {
    // Arrange
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });

    // Act
    const { container, getByText } = render(<AuthButton />);

    // Assert
    expect(container).toMatchSnapshot();
    expect(getByText("Sign in")).toBeTruthy();
  });

  it("renders logged-in user's info when user's session exists", () => {
    // Arrange
    const mockSession: Session = {
      user: { name: "Test User" },
      expires: "",
    };

    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession,
    });

    // Act
    const { container, getByText } = render(<AuthButton />);

    // Assert
    expect(container).toMatchSnapshot();
    expect(getByText("Test User")).toBeTruthy();
  });

  it("renders logged-in user's profile image when is available", () => {
    // Arrange
    const mockSession: Session = {
      user: { name: "Test User", image: "abcd.jpg" },
      expires: "",
    };

    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession,
    });

    // Act
    const { container, getByAltText } = render(<AuthButton />);

    // Assert
    expect(container).toMatchSnapshot();
    const imgElement = getByAltText("profile");
    expect(imgElement.getAttribute("src")).toBe("abcd.jpg");
  });

  it("should sign out when user click the sign out button", () => {
    // Arrange
    const mockSession: Session = {
      user: { name: "Test User" },
      expires: "",
    };

    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession,
    });

    // Act
    const { getByAltText } = render(<AuthButton />);
    const signOutButton = getByAltText("logout");
    fireEvent.click(signOutButton);

    // Assert
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
