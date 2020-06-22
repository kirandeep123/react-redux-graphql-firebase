import React from 'react';
import './default.scss';
import {Route,Switch} from 'react-router-dom';
 import HomePage from './pages/HomePage';
 import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
 import Registeration from './pages/Registeration';
function App() {
  return (
    <div className="App">

        <Switch>
        <Route path="/registeration" render={()=>(
         <MainLayout>
            <Registeration/>
          </MainLayout>
        )}/>
        <Route path="/" render={()=>(
          <HomepageLayout>
            <HomePage/>
          </HomepageLayout>
        )}/>
        </Switch>
      </div>
  );
}

export default App;
