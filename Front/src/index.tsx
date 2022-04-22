import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import reportWebVitals from "./reportWebVitals";
import Registration from "./pages/Registration/Registration";
import Authorization from "./pages/Authorization/Authorization";
import Appoints from "./pages/Appoints/Appoints";

import store from "./store";
import { history } from "./store";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/signin" component={Authorization} />
        <Route path="/signup" component={Registration} />
        <Route path="/appoints" component={Appoints} />
        <Redirect from={"/"} to={"/signin"} />
        <Route
          path="*"
          children={
            <>
              <h1>ОШИБКА 404</h1>
              <p>Страница не найдена</p>
            </>
          }
        />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
