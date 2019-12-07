import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodo from "./components/AddTodo";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from "./components/Drawer";
import Landing from "./components/Landing";
import {connect} from 'react-redux';
import {getProfileFetch} from './redux/actions';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const classes = useStyles();

  useEffect(() => {
    getProfileFetch();
  });
  
  return (
    <Router>
      <div className="App">
      <TemporaryDrawer></TemporaryDrawer>
        <AppBar>
          <Toolbar>
              <IconButton edge="start" className={classes.menuButton}  color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>

            <Switch>
              <Route path="/todo">
                <AddTodo />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
              <PrivateRoute  path="/landing">
                <Landing />
              </PrivateRoute>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </div>
    </Router>
  );
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default connect(null, mapDispatchToProps)(App);