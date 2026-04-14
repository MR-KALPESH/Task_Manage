import {
  CreateTaskService,
  DeleteTaskService,
  FindTaskService,
  UpdateTaskService,
} from "../Service.js/TaskService";
import { SetTaskData } from "../Slice/TaskSlice";

export const CreateTaskAction = (data) => async () => {
  try {
    const Response = await CreateTaskService(data);
    console.log("Reesponse :", Response?.data?.successa);
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};

export const UpdateTaskAction = (id, data) => async () => {
  try {
    const Response = await UpdateTaskService(id, data);
    console.log("Reesponse :", Response?.data);
  } catch (error) {
    console.log("ERROR", error);

    throw error;
  }
};
export const FindTaskAction = (data) => async (dispatch) => {
  try {
    const response = await FindTaskService(data);
    dispatch(SetTaskData(response?.data));
    // return response?.data;
  } catch (error) {
    console.log("ERROR", error);
    // throw error;
  }
};
export const DeleteTaskAction = (data) => async (dispatch) => {
  try {
    const response = await DeleteTaskService(data);
    dispatch(SetTaskData(response?.data));
    // return response?.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};
