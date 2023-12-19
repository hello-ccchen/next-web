/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import Users from "@/app/users/page";
import * as reactRedux from "@/store/store";
import { mockUserResponseDataWithOnePage } from "../config/mocks/users-data.mock";

describe("Users Page", () => {
  const useAppSelectorMock = jest.spyOn(reactRedux, "useAppSelector");
  const useAppDispatchMock = jest.spyOn(reactRedux, "useAppDispatch");

  afterEach(() => {
    useAppSelectorMock.mockClear();
    useAppDispatchMock.mockClear();
  });

  it("should renders correctly when contain records", () => {
    // Arrange
    useAppSelectorMock.mockReturnValue({
      userList: mockUserResponseDataWithOnePage.data,
      isLoading: false,
      error: undefined,
    });
    useAppDispatchMock.mockReturnValue(jest.fn());

    // Act
    const { container } = render(<Users />);

    // Assert
    expect(container).toMatchSnapshot();
    const divElements = container.querySelectorAll(".col-sm-4");
    expect(divElements).toBeTruthy();
    expect(divElements.length).toBe(
      mockUserResponseDataWithOnePage.data.length
    );
  });

  it("should renders `Loading...` when loading is true", () => {
    // Arrange
    useAppSelectorMock.mockReturnValue({
      userList: [],
      isLoading: true,
      error: undefined,
    });
    useAppDispatchMock.mockReturnValue(jest.fn());

    // Act
    const { container, getByText } = render(<Users />);

    // Assert
    expect(container).toMatchSnapshot();
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("should renders `No data` when contain no records", () => {
    // Arrange
    useAppSelectorMock.mockReturnValue({
      userList: [],
      isLoading: false,
      error: undefined,
    });
    useAppDispatchMock.mockReturnValue(jest.fn());

    // Act
    const { container, getByText } = render(<Users />);

    // Assert
    expect(container).toMatchSnapshot();
    expect(getByText("Uh-oh, no data")).toBeTruthy();
  });
});
