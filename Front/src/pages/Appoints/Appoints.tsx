import { useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import Header from "../../components/Header/Header";
import Button from "../../common/Button/Button";
import AddAppoints from "../../components/AddAppoints";
import Table from "../../components/Table/Table";
import Sorting from "../../components/AppointsActions/Sorting";
import UserService from "../../services/UserService";
import Filtering from "../../components/AppointsActions/Filtering";

import { setAppointsFromBaseAction } from "../../store/appoints/appointsActions";

import "./Appoints.scss";

const Appoints: FC = () => {
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSortLoading, setIsSortLoading] = useState(true);

  const dispatch = useDispatch();

  const setAppointsFromBaseToStore = async () => {
    setIsLoading(true);
    await dispatch(setAppointsFromBaseAction());
    setIsLoading(false);
  };
  useEffect(() => {
    localStorage.getItem("accessToken")
      ? setAppointsFromBaseToStore()
      : dispatch(push("/signin"));
  }, []);

  const logout = async () => {
    try {
      await UserService.post("logout");
      await localStorage.removeItem("accessToken");
      await localStorage.removeItem("refreshToken");
      dispatch(push("/signin"));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };

  return (
    <>
      <Header title="Приемы">
        <Button onClick={logout} title={"Выйти"} />
      </Header>
      <AddAppoints
        setAppointsFromBaseToStore={setAppointsFromBaseToStore}
        setIsSortLoading={setIsSortLoading}
      />
      {!isLoading && (
        <>
          <Sorting
            filterActive={filterActive}
            setFilterActive={setFilterActive}
            setIsSortLoading={setIsSortLoading}
          />
          <Filtering
            setIsSortLoading={setIsSortLoading}
            filterActive={filterActive}
            setFilterActive={setFilterActive}
          />
          {!isSortLoading && (
            <Table setAppointsFromBaseToStore={setAppointsFromBaseToStore} />
          )}
        </>
      )}
    </>
  );
};

export default Appoints;
