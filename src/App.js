import React, { useEffect } from "react";
import "./default.scss";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import { auth, handleUserProfile } from "./firebase/utils";
import Recovery from "./pages/Recovery";

import { setCurrentUser } from "./redux/User/user.actions";
import { connect } from "react-redux";

import Dashboard from "./pages/Dashboard";

// hoc 

import WithAuth from './hoc/withAuth';
const App = props => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/registeration"
          render={() =>

              <MainLayout>
                <Registeration />
              </MainLayout>
            
          }
        />
        <Route
          path="/login"
          render={() =>
          
              <MainLayout>
                <Login />
              </MainLayout>
            
          }
        />
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <HomePage />
            </HomepageLayout>
          )}
        />

        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />

        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
