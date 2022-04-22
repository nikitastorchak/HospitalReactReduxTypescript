import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { appointsReducer } from "./appoints/appointsReducer";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

type AppAction = ReturnType<typeof store.dispatch>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  appoints: appointsReducer,
  router: connectRouter(history),
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export type AppDispatch = ThunkDispatch<RootState, any, AppAction>;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
