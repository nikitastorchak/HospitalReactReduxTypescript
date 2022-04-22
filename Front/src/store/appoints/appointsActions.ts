import {
  AppointsActionsTypes,
  List,
  AppointsAction,
  AppThunk,
} from "../../types/appoints";

import UserService from "../../services/UserService";
import { Dispatch } from "redux";

const setAppoints = (data: List[]) => ({
  type: AppointsActionsTypes.SET_APPOINTS,
  payload: data,
});

const setFilterAppoints = (data: List[]) => ({
  type: AppointsActionsTypes.SET_FILTER_APPOINTS,
  payload: data,
});
const setSortedAppoints = (data: List[]) => ({
  type: AppointsActionsTypes.SET_SORTED_APPOINTS,
  payload: data,
});

export const setAppointsAction =
  (payload: List[]): AppThunk =>
  async (dispatch) => {
    try {
      const response = await UserService.post("add", payload);
      dispatch(setAppoints(response.data));
    } catch (e: any) {}
  };

export const setAppointsFromBaseAction = (): AppThunk => async (dispatch) => {
  try {
    const response = await UserService.get("show");
    dispatch(setAppoints(response.data));
  } catch (e: any) {
    return e.message;
  }
};

export const setFilteredAppointsAction =
  (payload: List[]): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setFilterAppoints(payload));
    } catch (e: any) {
      console.log(e.message);
    }
  };

export const setSortedAppointsAction =
  (payload: List[]): AppThunk =>
  async (dispatch: Dispatch<AppointsAction>) => {
    try {
      dispatch(setSortedAppoints(payload));
    } catch (e: any) {
      console.log(e.message);
    }
  };
