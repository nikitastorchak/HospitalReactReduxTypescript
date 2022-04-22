import { FC, useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import LoginForm from "../../components/Forms/LoginForm";

const Authorization: FC = () => {
  const path = "/appoints";

  const dispatch = useDispatch();

  const authChecker = () => {
    const isUserAuthorised = localStorage.getItem("accessToken");
    isUserAuthorised && dispatch(push(path));
  };

  useEffect(() => {
    authChecker();
  }, []);

  return (
    <>
      <Header title="Войти в систему" />
      <Layout>
        <LoginForm path={path} />
      </Layout>
    </>
  );
};

export default Authorization;
