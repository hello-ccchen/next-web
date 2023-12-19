import { IUserAPIResponse } from "@/interfaces/users-interface";
import { getUsers } from "@/services/users-service";

const mockUserResponseDataWithOnePage: IUserAPIResponse = {
  page: 1,
  per_page: 1,
  total: 1,
  total_pages: 1,
  data: [
    {
      id: 1,
      email: "abcd@mail.com",
      first_name: "Guava",
      last_name: "Banana",
      avatar: "abcd.jpg",
    },
    {
      id: 2,
      email: "wxyz@mail.com",
      first_name: "Apple",
      last_name: "Orange",
      avatar: "abcd.jpg",
    },
  ],
};

const mockUserResponseDataWithTwoPage_Page1: IUserAPIResponse = {
  page: 1,
  per_page: 1,
  total: 1,
  total_pages: 2,
  data: [
    {
      id: 1,
      email: "abcd@mail.com",
      first_name: "Guava",
      last_name: "Banana",
      avatar: "abcd.jpg",
    },
    {
      id: 2,
      email: "wxyz@mail.com",
      first_name: "Papaya",
      last_name: "Watermelon",
      avatar: "abcd.jpg",
    },
  ],
};
const mockUserResponseDataWithTwoPage_Page2: IUserAPIResponse = {
  page: 2,
  per_page: 1,
  total: 2,
  total_pages: 2,
  data: [
    {
      id: 2,
      email: "xyz@mail.com",
      first_name: "yyy",
      last_name: "xxx",
      avatar: "xxx.jpg",
    },
  ],
};
describe("Users service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetch users from the API with correct filtered result", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUserResponseDataWithOnePage,
      status: 200,
    });

    const data = await getUsers();

    expect(data).toEqual([mockUserResponseDataWithOnePage.data[0]]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=1"
    );
  });

  it("fetch users from the API by traverse all paging with correct filtered result", async () => {
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

    const data = await getUsers();

    expect(data).toEqual(mockUserResponseDataWithTwoPage_Page1.data);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=1"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=2"
    );
  });

  it("handles API call failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getUsers()).rejects.toThrow("Failed to get user list.");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://reqres.in/api/users?page=1"
    );
  });
});
