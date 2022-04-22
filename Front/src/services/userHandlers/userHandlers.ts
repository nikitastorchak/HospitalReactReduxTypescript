import { FormEvent, useCallback } from "react";
import AuthServise from "../UserService";
import { Response } from "../../types/appoints";
import AuthService from "../UserService";
import { push } from "connected-react-router";

export const registrationHandler = async (
  e: FormEvent<HTMLFormElement>,
  password: string,
  passwordCheck: string | any,
  login: string
) => {
  e.preventDefault();
  if (password === passwordCheck || passwordCheck !== "") {
    try {
      const response: Response = await AuthServise.post("registration", {
        login,
        password,
      });
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (e: any) {
      alert("Ошибка при регистрации");
      console.log(e.message);
    }
  } else {
    alert("Пароли не совпадают");
  }
};

export const authorizationHandler = async (
  e: FormEvent<HTMLFormElement>,
  password: string,
  login: string
) => {
  e.preventDefault();
  try {
    const response = await AuthService.post("login", {
      login,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (e: any) {
    alert("Ошибка при регистрации");
    console.log(e.message);
  }
};
