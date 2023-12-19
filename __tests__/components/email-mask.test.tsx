/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import EmailMask from "@/components/users/email-mask";

describe("EmailMask component", () => {
  it("email should masked correctly", () => {
    const { container, getByText } = render(<EmailMask email="abcd@mail.com" />);
    expect(container).toMatchSnapshot();
    expect(getByText('****@mail.com')).toBeTruthy();
  });

  it("should reveal email when revealEmail button is clicked", () => {
    const { getByAltText, getByText } = render(<EmailMask email="abcd@mail.com" />);
    const revealEmailButton = getByAltText('mask');
    fireEvent.click(revealEmailButton);
    expect(getByText('abcd@mail.com')).toBeTruthy();
  })

  it("should not mask invalid email", () => {
    const { getByText } = render(<EmailMask email="abcdmail.com" />);
    expect(getByText('abcdmail.com')).toBeTruthy();
  })
});
