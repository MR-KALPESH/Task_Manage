import API from "../API/Api";

export const CreateTaskService = (data) => {
  return API.post("Task/createTask", data);
};
export const DeleteTaskService = (data) => {
  return API.delete(`Task/Delete/${data}`);
};
export const FindTaskService = (data) => {
  return API.get(`Task/findTask/${data}`);
};
export const UpdateTaskService = (id, data) => {
  return API.put(`Task/UpdateTask/${id}`, data);
};
