import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { IUserState } from "./interface";
import { getUsers } from "./service";

const initialState: IUserState = {
  userList: [],
  isLoading: true,
  error: undefined,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const users = await getUsers();
    return users;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const usersSelector = (state: RootState) => state.users;
export default userSlice.reducer;
