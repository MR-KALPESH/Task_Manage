import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSiice";
import TaskSlice from "./Slice/TaskSlice";

const store = configureStore({
  reducer: {
    User: UserSlice,
    task: TaskSlice,
  },
});

export default store;
