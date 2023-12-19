import UsersService from "@/services/users/users-service";
import {
  mockUserResponseDataWithOnePage,
  mockUserResponseDataWithTwoPage_Page1,
  mockUserResponseDataWithTwoPage_Page2,
} from "../config/mocks/users-data.mock";

describe("Users service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetch users from the API with correct filtered result", async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUserResponseDataWithOnePage,
      status: 200,
    });

    // Act
    const data = await UsersService.getUsers();

    // Assert
    expect(data).toEqual([mockUserResponseDataWithOnePage.data[0]]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=1"
    );
  });

  it("fetch users from the API by traverse all paging with correct filtered result", async () => {
    // Arrange
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserResponseDataWithTwoPage_Page1,
        status: 200,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserResponseDataWithTwoPage_Page2,
        status: 200,
      });

    // Act
    const data = await UsersService.getUsers();

    // Assert
    expect(data).toEqual(mockUserResponseDataWithTwoPage_Page1.data);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=1"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=2"
    );
  });

  it("handles API call failure", async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    // Act & Assert
    await expect(UsersService.getUsers()).rejects.toThrow("Failed to get user list.");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=1"
    );
  });
});
