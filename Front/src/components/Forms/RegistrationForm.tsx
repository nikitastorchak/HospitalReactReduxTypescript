import React, { FormEvent, useCallback, useState } from "react";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";

import { registrationHandler } from "../../services/userHandlers/userHandlers";

import { FormProps, User } from "../../types/appoints";
import { useDispatch } from "../../store";

const RegistrationForm = ({ path }: FormProps) => {
  const [user, setUser] = useState<User>({
    login: "",
    password: "",
    passwordCheck: "",
  });
  const { login, password, passwordCheck } = user;
  const dispatch = useDispatch();

  const changeUserHandler = useCallback(
    (field: string, value: string) => setUser({ ...user, [field]: value }),
    [login, password, passwordCheck]
  );

  const registration = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        await registrationHandler(e, password, passwordCheck, login);
        dispatch(push(path));
      } catch (e) {}
    },
    [login, password, passwordCheck]
  );

  return (
    <form onSubmit={registration}>
      <h1>Регистрация</h1>
      <label htmlFor="login">Login:</label>
      <input
        id="login"
        pattern="[a-zA-Z0-9]{6,}"
        value={login}
        title="Логин должен состоять минимум из 6 символов"
        placeholder="Login"
        onChange={(e) => changeUserHandler("login", e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type={"password"}
        value={password}
        pattern="(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}"
        title="Пароль должен содержать миниму 6 символов (и не больше 16) и содержать хотя бы одну цифру и заглавную букву"
        placeholder="Password"
        onChange={(e) => changeUserHandler("password", e.target.value)}
      />
      <label htmlFor="rep_password">Repeat password:</label>
      <input
        id="rep_password"
        type={"password"}
        value={passwordCheck}
        placeholder="Password"
        onChange={(e) => changeUserHandler("passwordCheck", e.target.value)}
      />
      <button type="submit">Зарегистрироваться</button>
      <Link to={"/signin"}>Авторизоваться</Link>
    </form>
  );
};

export default RegistrationForm;
