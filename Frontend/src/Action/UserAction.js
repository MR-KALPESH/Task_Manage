import { LoginService, Registerservice } from "../Service.js/UserApi";
import { SetLogin, SetUser } from "../Slice/UserSiice";

export const RegisterAction = (body) => () => {
  try {
    const request = Registerservice(body);
    console.log(request);
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const UserLoginAction = (body) => async (dispatch) => {
  try {
    const response = await LoginService(body);
    dispatch(SetLogin(response?.data?.sucess));
    dispatch(SetUser(response?.data?.userdata));
    localStorage.setItem("user", JSON.stringify(response?.data?.userdata));
    console.log(response?.data?.sucess);
    return response.data; // IMPORTANT
  } catch (error) {
    console.log("Error : ", error);
    throw error;
  }
};
