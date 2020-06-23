import React from 'react';
import './styles.scss';
import Button from './../forms/Button';
import {signInwithGoogle} from './../../firebase/utils';

class Signin extends React.Component{

handleSubmit = async e =>{
    e.preventDefault();
}
render(){
    return(
        <div className="signin">
           <div className="wrap">
               <h2>LogIn</h2>
               <div className="formwrap">
                   <form onSubmit={this.handleSubmit}>
                       <div className="socialSignin">
                           <div className="row">
                                <Button onClick={signInwithGoogle}>Sign in with google</Button>
                            </div>
                       </div>
                   </form>
               </div>
           </div>
        </div>
    )
}
}
export default Signin;