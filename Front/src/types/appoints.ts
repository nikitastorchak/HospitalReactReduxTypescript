import { RootState } from "../store";
import { ThunkAction } from "redux-thunk";

export enum AppointsActionsTypes {
  GET_APPOINTS = "GET_APPOINTS",
  SET_APPOINTS = "SET_APPOINTS",
  SET_SORTED_APPOINTS = "SET_SORTED_APPOINTS",
  SET_FILTER_APPOINTS = "SET_FILTER_APPOINTS",
}
interface GetApointsAction {
  type: AppointsActionsTypes.GET_APPOINTS;
}
interface SetApointsAction {
  type: AppointsActionsTypes.SET_APPOINTS;
  payload: List[];
}
interface SetSortedApointsAction {
  type: AppointsActionsTypes.SET_SORTED_APPOINTS;
  payload: List[];
}
interface SetFilterApointsAction {
  type: AppointsActionsTypes.SET_FILTER_APPOINTS;
  payload: List[];
}

export interface AppointsReducer {
  appoints: List[];
  sortAppoints: List[];
  filterAppoints: List[];
}
export type AppointsAction =
  | GetApointsAction
  | SetApointsAction
  | SetSortedApointsAction
  | SetFilterApointsAction;

export interface List {
  _id?: string;
  user_id?: string;
  fio: string;
  doctor: string;
  date: string;
  complaint: string;
}

export interface AddAppointsProps {
  setAppointsFromBaseToStore: () => void;
  setIsSortLoading: (isTrue: boolean) => void;
}

export interface SortingProps {
  setIsSortLoading: (isTrue: boolean) => void;
  filterActive: boolean;
  setFilterActive: (isTrue: boolean) => void;
}

export interface HeaderProps {
  title: string;
}

export interface FormProps {
  path: string;
}

export interface TableProps {
  setAppointsFromBaseToStore: () => void;
}

export interface User {
  login: string;
  password: string;
  passwordCheck?: string;
}

export interface Data {
  accessToken: string;
  refreshToken: string;
}
export interface Response {
  data: Data;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppointsAction
>;
