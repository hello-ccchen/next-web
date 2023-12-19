import { IUserAPIResponse } from "@/interfaces/users/users-interface";

export const mockUserResponseDataWithOnePage: IUserAPIResponse = {
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
      avatar: "https://example/guava.jpg",
    },
    {
      id: 2,
      email: "wxyz@mail.com",
      first_name: "Apple",
      last_name: "Orange",
      avatar: "https://example/apple.jpg",
    },
  ],
};

export const mockUserResponseDataWithTwoPage_Page1: IUserAPIResponse = {
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
      avatar: "https://example/guava.jpg",
    },
    {
      id: 2,
      email: "wxyz@mail.com",
      first_name: "Papaya",
      last_name: "Watermelon",
      avatar: "https://example/papaya.jpg",
    },
  ],
};

export const mockUserResponseDataWithTwoPage_Page2: IUserAPIResponse = {
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
      avatar: "https://example/yyy.jpg",
    },
  ],
};
