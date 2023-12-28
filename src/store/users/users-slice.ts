import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "@/interfaces/users/users-interface";
import { RootState } from "@/store/store";

const initialState: IUserState = {
  userList: [],
  isLoading: true,
  error: undefined,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch("/api/users");
    const users = await response.json();
    return users.result;
  } catch (error) {
    throw error;
  }
});

export const revealUserEmail = createAsyncThunk(
  "users/revealUserEmail",
  async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      return user.result;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    maskUserEmail: (state, action) => {
      const user = state.userList.find((usr) => usr.id === action.payload);
      if (user) {
        user.email = "*****";
      }
    },
  },
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
      })
      .addCase(revealUserEmail.fulfilled, (state, action) => {
        const user = state.userList.find((usr) => usr.id === action.payload.id);
        if (user) {
          user.email = action.payload.email;
        }
      });
  },
});

export const userAction = userSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export default userSlice.reducer;
