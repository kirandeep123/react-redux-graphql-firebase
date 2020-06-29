import React,{useState} from 'react';
import './styles.scss';
import Button from './../forms/Button';
import {signInwithGoogle,auth} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';
import FormInput from '../forms/FormInput';
import {Link,withRouter} from 'react-router-dom';


const  Signin  = props =>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const resetForm=()=>{
        setEmail('');
        setPassword('');
    }
    const  handleSubmit = async e =>{
    e.preventDefault();
    try{
        await auth.signInWithEmailAndPassword(email,password);
        resetForm();
        props.history.push('./login');
    }
    catch(err){
        // console.log(err);
    }

}

    return(
      <AuthWrapper headline="login">
        <div className="formwrap">
            <form onSubmit={handleSubmit}>
                <FormInput
                       type="email"
                       name="email"
                       value={email}
                       placeholder="Email"
                       handleChange={e=>setEmail(e.target.value)}
                />
                <FormInput
                       type="password"
                       name="password"
                       value={password}
                       placeholder="Password"
                       handleChange={e=>setPassword(e.target.value)}

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

export default withRouter(Signin);