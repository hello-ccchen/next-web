import { IUser, IUserAPIResponse } from "./interface";

export const getAllUserList = async (): Promise<IUser[]> => {
  let userList: IUser[] = [];
  let currentPage = 1;
  let totalPages = 0;

  try {
    do {
      const response = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
      const result: IUserAPIResponse = await response.json();
      if (!result) {
        break;
      }
      totalPages = result?.total_pages ?? 0;
      const filteredUserList = result?.data.filter(user => user?.first_name?.charAt(0) === "G" || user?.last_name?.charAt(0) === "W");
      userList.push(...filteredUserList);
      currentPage++;
    } while (currentPage <= totalPages);
  } catch (error) {
    console.error(error);
  }

  return userList;
};

