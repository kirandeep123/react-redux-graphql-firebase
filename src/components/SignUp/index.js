import React ,{useState}from "react";
import "./styles.scss";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import {auth,handleUserProfile} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';

import {withRouter} from 'react-router-dom';
const SignUp =props =>{
  const [displayName,setdisplayName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setconfirmPassword]=useState("");
  const [errors,setErrors]= useState([]);

  const resetForm = ()=>{
    setdisplayName('');
    setEmail('');
    setPassword('');
    setconfirmPassword('');
  }
  const handleFormSubmit= async event=>{
      event.preventDefault();
        if(password!==confirmPassword){
          const err =['Passwords Don\'t Match']
          // this.setState({errors:err});
          setErrors(err);
          return;
        }
        try{
          const {user}= await auth.createUserWithEmailAndPassword(email,password);
          await handleUserProfile(user,{displayName});
          resetForm();
          props.history.push('./login');
        }
      catch(err){
     //  console.log(err);
      }
  }
  
    return (
         <AuthWrapper headline="signup">
         {errors.length>0 && (
              <ul>
                  {errors.map((item,index)=>{
                  return(
                  <span key={index}>{item}</span>
                  );
                  })}
              </ul>
          )}
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={displayName}
              handleChange={e=>setdisplayName(e.target.value)}
            />
             <FormInput
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              handleChange={e=>setEmail(e.target.value)}
            />
               <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              handleChange={e=>setPassword(e.target.value)}
            />
               <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Cofirm Password"
              value={confirmPassword}
              handleChange={e=>setconfirmPassword(e.target.value)}
            />
            <Button type="submit">Register</Button>
          </form>
          </AuthWrapper>
    );
  }

export default  withRouter(SignUp);
