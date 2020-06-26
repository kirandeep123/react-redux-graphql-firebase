import React from 'react';
import './styles.scss';
import Button from './../forms/Button';
import {signInwithGoogle,auth} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';
import FormInput from '../forms/FormInput';
import {Link} from 'react-router-dom';
const initialState={
    email:'',
    password:''
}
class Signin extends React.Component{

    constructor(props){
        super(props);
        this.state={
            ...initialState
        }
        this.onInputChange = this.onInputChange.bind(this);
    }
handleSubmit = async e =>{
    e.preventDefault();
    const {email,password}= this.state;
    try{
        await auth.signInWithEmailAndPassword(email,password);
        this.setState({...initialState})
    }
    catch(err){
        // console.log(err);
    }

}
onInputChange(event){
    const {name,value}= event.target;
    this.setState({
    [name]:value
})
}
render(){
    const {email,password} = this.state;
    return(
      <AuthWrapper headline="login">
               <div className="formwrap">
                   <form onSubmit={this.handleSubmit}>
                       <FormInput
                       type="email"
                       name="email"
                       value={email}
                       placeholder="Email"
                       handleChange={this.onInputChange}
                       />
                       <FormInput
                       type="password"
                       name="password"
                       value={password}
                       placeholder="Password"
                       handleChange={this.onInputChange}

                       />
                       <Button type="submit">LogIn</Button>
                       <div className="socialSignin">
                           <div className="row">
                                <Button style={{marginTop:'12px'}} onClick={signInwithGoogle}>Sign in with google</Button>
                            </div>
                       </div>
                       <div className="links">
                           <Link to="/recovery">
                               Reset Password
                           </Link>
                       </div>
                   </form>
               </div>
               </AuthWrapper>
         
    )
}
}
export default Signin;