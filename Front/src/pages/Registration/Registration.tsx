import { FC, useEffect } from "react";

import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

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
      <Header title="Зарегистрироваться в системе" />
      <Layout>
        <RegistrationForm path={path} />
      </Layout>
    </>
  );
};

export default Authorization;
