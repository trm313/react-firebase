// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

// Pages
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Account from "../Pages/Account";

const Post = () => (
  <div>
    <h1>Post</h1>
  </div>
);
const PostEdit = () => (
  <div>
    <h1>PostEdit</h1>
  </div>
);

// Route Types
const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((store) => store.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/login' component={Login} />
    <PrivateRoute exact path='/account' component={Account} />
    <PrivateRoute path='/:slug/edit' component={PostEdit} />
    <Route path='/:slug' component={Post} />
  </Switch>
);

export default Routes;
