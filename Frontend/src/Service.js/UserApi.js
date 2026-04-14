import API from "../API/Api";

export const Registerservice = (data) => {
  return API.post("User/register", data);
};

export const LoginService = (data) => {
  return API.post("User/login", data);
};
