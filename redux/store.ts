import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlice/TodoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
