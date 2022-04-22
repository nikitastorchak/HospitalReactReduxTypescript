import { useState, useCallback, FormEvent } from "react";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";

import { FormProps, User } from "../../types/appoints";
import { useDispatch } from "../../store";
import { authorizationHandler } from "../../services/userHandlers/userHandlers";

const LoginForm = ({ path }: FormProps) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<User>({
    login: "",
    password: "",
  });
  const { login, password } = user;
  const changeUserHandler = useCallback(
    (field: string, value: string) => setUser({ ...user, [field]: value }),
    [login, password]
  );

  const authorization = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        await authorizationHandler(e, password, login);
        dispatch(push(path));
      } catch (e) {}
    },
    [login, password]
  );

  return (
    <form onSubmit={authorization}>
      <h1>Войти в систему</h1>
      <label htmlFor="login">Логин:</label>
      <input
        id="login"
        placeholder="Login"
        pattern="[a-zA-Z0-9]{6,}"
        value={login}
        title="Логин должен состоять минимум из 6 символов"
        required
        onChange={(e) => changeUserHandler("login", e.target.value)}
      />
      <label htmlFor="password">Пароль:</label>
      <input
        type="password"
        id="password"
        pattern="(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}"
        placeholder="Password"
        value={password}
        onChange={(e) => changeUserHandler("password", e.target.value)}
        required
        title="Пароль должен содержать минимум 6 символов (и не больше 16) и содержать хотя бы одну цифру и заглавную букву"
      />
      <button type="submit">Войти</button>
      <Link to={"/signup"}>Зарегистрироваться</Link>
    </form>
  );
};

export default LoginForm;
