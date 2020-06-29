import React from "react";
import "./default.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import { auth, handleUserProfile } from "./firebase/utils";
import Recovery from "./pages/Recovery";

import {setCurrentUser} from './redux/User/user.actions';
import {connect} from 'react-redux';


class App extends React.Component {
 
  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }

      this.props.setCurrentUser(userAuth);
    });
  }
  componentWillUnmount() {
    this.authListener();
  }
  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route
            path="/registeration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Registeration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps= ({user})=>({
  currentUser:user.currentUser
});

const mapDispatchToProps=(dispatch)=>({
setCurrentUser:user=>dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
