/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import Login from "@/app/login/page";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("Login Page", () => {
  it("renders no access rigth when detected callbackurl", () => {
    // Arrange
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "abcde",
    });

    // Act
    const { container, getByText } = render(<Login />);

    // Assert
    expect(container).toMatchSnapshot();
    expect(getByText("401: Uh-oh, you do not have access. 😟")).toBeTruthy();
  });

  it("renders `You're almost there!` when detected no callbackurl", () => {
    // Arrange
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    // Act
    const { container, getByText } = render(<Login />);

    // Assert
    expect(container).toMatchSnapshot();
    expect(getByText(`You're almost there! 😁`)).toBeTruthy();
  });

  it("should sign in when user click the sign in button", () => {
    // Arrange
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    // Act
    const { container } = render(<Login />);
    const loginButton = container.querySelector(".btn");
    expect(loginButton).toBeTruthy();
    fireEvent.click(loginButton as Element);

    // Assert
    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });
});
