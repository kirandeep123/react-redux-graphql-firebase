import React from 'react';
import './default.scss';
import {Route,Switch,Redirect} from 'react-router-dom';
 import HomePage from './pages/HomePage';
 import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
 import Registeration from './pages/Registeration';
 import Login from './pages/Login';
 import {auth, handleUserProfile} from './firebase/utils';


 const initialState={
   currentUser:null
 }
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener= null;

   componentDidMount(){
    this.authListener =  auth.onAuthStateChanged( async userAuth=>{
      if(userAuth){
        const userRef = await  handleUserProfile(userAuth);
        userRef.onSnapshot(snapShot=>{
          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }

     this.setState({
       ...initialState
     })
    });
  }
  componentWillUnmount(){
    this.authListener();
  }
  render(){
    const {currentUser} =  this.state;

  return (
    <div className="App">
        <Switch>
        <Route path="/registeration" render={()=>(
         <MainLayout  currentUser={currentUser}>
            <Registeration/>
          </MainLayout>
        )}/>
         <Route path="/login" 
         render={()=> currentUser ? <Redirect to="/"/>:(
          <MainLayout  currentUser={currentUser}>
            <Login/>
          </MainLayout>
        )}/>
        <Route exact path="/" render={()=>(
          <HomepageLayout currentUser={currentUser}>
            <HomePage/>
          </HomepageLayout>
        )}/>
       
        </Switch>
      </div>
  );
}
}

export default App;
