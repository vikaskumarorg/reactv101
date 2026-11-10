import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import usersReducer from "../features/users/userslice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,

  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;