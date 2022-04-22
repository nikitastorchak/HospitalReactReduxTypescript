import {
  AppointsAction,
  AppointsActionsTypes,
  AppointsReducer,
} from "../../types/appoints";

const appoints: AppointsReducer = {
  appoints: [],
  sortAppoints: [],
  filterAppoints: [],
};

export const appointsReducer = (
  state = appoints,
  action: AppointsAction
): AppointsReducer => {
  switch (action.type) {
    case AppointsActionsTypes.GET_APPOINTS:
      return {
        ...state,
      };
    case AppointsActionsTypes.SET_APPOINTS:
      return {
        ...state,
        appoints: action.payload,
      };
    case AppointsActionsTypes.SET_SORTED_APPOINTS:
      return {
        ...state,
        sortAppoints: action.payload,
      };
    case AppointsActionsTypes.SET_FILTER_APPOINTS:
      return {
        ...state,
        filterAppoints: action.payload,
      };
    default:
      return state;
  }
};
