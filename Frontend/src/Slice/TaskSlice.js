import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  taskData: {},
};

const TaskSlice = createSlice({
  name: "task",
  initialState: initialstate,
  reducers: {
    SetTaskData: (state, action) => {
      state.taskData = action.payload;
    },
  },
});

export const { SetTaskData } = TaskSlice.actions;
export default TaskSlice.reducer;
