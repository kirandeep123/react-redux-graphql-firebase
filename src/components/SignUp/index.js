import React from "react";
import "./styles.scss";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import {auth,handleUserProfile} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';
const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors:[]
};
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleFormSubmit= async event=>{
      event.preventDefault();
      const {displayName,email,password,confirmPassword} = this.state;
        if(password!==confirmPassword){
          const err =['Passwords Don\'t Match']
          this.setState({errors:err});
          return;
        }
        try{
          const {user}= await auth.createUserWithEmailAndPassword(email,password);
          await handleUserProfile(user,{displayName});
          this.setState({
              ...initialState
          });
        }
      catch(err){
       console.log(err);
      }
  }
  render() {
    return (
         <AuthWrapper headline="signup">
         {this.state.errors.length>0 && (
              <ul>
                  {this.state.errors.map((item,index)=>{
                  return(
                  <span key={index}>{item}</span>
                  );
                  })}
              </ul>
          )}
          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={this.state.displayName}
              handleChange={this.onInputChange}
            />
             <FormInput
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              handleChange={this.onInputChange}
            />
               <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              handleChange={this.onInputChange}
            />
               <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Cofirm Password"
              value={this.state.confirmPassword}
              handleChange={this.onInputChange}
            />
            <Button type="submit">Register</Button>
          </form>
          </AuthWrapper>
    );
  }
}
export default SignUp;
