import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import { getUsersApi } from "./usersService";
import type { User, UsersStateCollection } from "./usersTypes";
import type { RootState } from "../../store/store";

export const fetchUsers = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsersApi();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  },
    {
    condition: (_, { getState }) => {

      const state = getState() as RootState;

      return state.users.loading !== true;

    }
}
);

const initialState: UsersStateCollection = {
  users: [] as User[],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;