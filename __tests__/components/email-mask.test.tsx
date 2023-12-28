/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import EmailMask from "@/components/users/email-mask";
import * as reactRedux from "@/store/store";
import { mockFilteredUserResponseDataWithOnePage } from "../config/mocks/users-data.mock";

describe("EmailMask component", () => {
  const useAppDispatchMock = jest.spyOn(reactRedux, "useAppDispatch");

  afterEach(() => {
    useAppDispatchMock.mockClear();
  });

  it("email should masked correctly", () => {
    useAppDispatchMock.mockReturnValue(jest.fn());
    const { container, getByText } = render(<EmailMask {...mockFilteredUserResponseDataWithOnePage[0]} />);
    expect(container).toMatchSnapshot();
    expect(getByText('*****')).toBeTruthy();
  });

  it("should reveal email when revealEmail button is clicked", () => {
    useAppDispatchMock.mockReturnValue(jest.fn());
    const { getByAltText } = render(<EmailMask {...mockFilteredUserResponseDataWithOnePage[0]} />);
    const revealEmailButton = getByAltText('mask');
    fireEvent.click(revealEmailButton);
    expect(useAppDispatchMock).toHaveBeenCalled();
  });
});
