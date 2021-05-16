import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from "../components/SignUp";
import history from "../utils/history";


const AppRouter = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route exact path="/signUp" component={SignUp} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default AppRouter;


