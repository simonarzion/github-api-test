import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import { allReducers } from "./redux/store/store";

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/users/:login" component={UserScreen} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
