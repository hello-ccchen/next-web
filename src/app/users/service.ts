import { IUser, IUserAPIResponse } from "./interface";

export const getUsers = async (): Promise<IUser[]> => {
  let userList: IUser[] = [];
  let currentPage = 1;
  let totalPages = 0;

  do {
    const response = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
    if (response.status !== 200) {
      throw new Error('Failed to get user list.');
    }
    const result: IUserAPIResponse = await response.json();
    totalPages = result?.total_pages ?? 0;
    const filteredUserList = result?.data.filter(user => user?.first_name?.charAt(0) === "G" || user?.last_name?.charAt(0) === "W");
    userList.push(...filteredUserList);
    currentPage++;
  } while (currentPage <= totalPages);

  return userList;
};

