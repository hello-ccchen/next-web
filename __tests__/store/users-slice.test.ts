import { IUserState } from "@/interfaces/users/users-interface";
import usersReducer, { fetchUsers, revealUserEmail, userAction } from "@/store/users/users-slice";
import { mockFilteredUserResponseDataWithOnePage, mockUserResponseDataWithOnePage } from "../config/mocks/users-data.mock";
import UsersService from "@/services/users/users-service";

const initialState: IUserState = {
  isLoading: true,
  error: undefined,
  userList: [],
};

describe("User Slice", () => {
  it("should return the initial state on first run", () => {
    // Arrange
    const action = { type: "unknown" };

    // Act
    const state = usersReducer(undefined, action);

    // Assert
    expect(state).toEqual(initialState);
  });

  it("should set isLoading to true when dispatch fetchUsers.pending action", () => {
    // Arrange
    const action = { type: fetchUsers.pending.type };

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state.isLoading).toEqual(true);
    expect(state.error).toBeUndefined();
    expect(state.userList).toEqual([]);
  });

  it("should set error when dispatch fetchUsers.rejected action", () => {
    // Arrange
    const action = {
      type: fetchUsers.rejected.type,
      error: new Error("failed to fetch users"),
    };

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual("failed to fetch users");
    expect(state.userList).toEqual([]);
  });

  it("should set userList when dispatch fetchUsers.fullfilled action", () => {
    // Arrange
    const action = {
      type: fetchUsers.fulfilled.type,
      payload: mockUserResponseDataWithOnePage.data,
    };

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state.isLoading).toEqual(false);
    expect(state.error).toBeUndefined();
    expect(state.userList).toEqual(mockUserResponseDataWithOnePage.data);
  });

  it("fetchUsers async thunk action should calls the API correctly", async () => {
    // Arrange
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => mockUserResponseDataWithOnePage.data,
    });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const action = fetchUsers();

    // Act
    await action(dispatch, getState, undefined);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith("/api/users");
    jest.restoreAllMocks();
  });

  it("should mask user email when dispatch maskUserEmail action", () => {
    // Arrange
    const initialState: IUserState = {
      userList: mockFilteredUserResponseDataWithOnePage,
      isLoading: false,
      error: undefined
    }
    const action = userAction.maskUserEmail(1)

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state.userList[0].email).toEqual("*****");
  });

  it("should reveal user email when dispatch revealUserEmail.fullfilled action", () => {
    // Arrange
    const initialState: IUserState = {
      userList: mockFilteredUserResponseDataWithOnePage,
      isLoading: false,
      error: undefined
    }
    const action = {
      type: revealUserEmail.fulfilled.type,
      payload: mockUserResponseDataWithOnePage.data[0],
    };

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state.userList[0].email).toEqual("abcd@mail.com");
  });

  it("revealUserEmail async thunk action should calls the API correctly", async () => {
    // Arrange
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => mockUserResponseDataWithOnePage.data[0],
    });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const action = revealUserEmail(1);

    // Act
    await action(dispatch, getState, undefined);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(`/api/users/${1}`);
    jest.restoreAllMocks();
  });
});
