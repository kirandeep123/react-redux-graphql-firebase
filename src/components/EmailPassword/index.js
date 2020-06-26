import React from 'react';
import './styles.scss';
import {withRouter} from 'react-router-dom';


import AuthWrapper from './../AuthWrapper';
import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import {auth} from './../../firebase/utils';

const initialState={
    email:'',
    errors:[]
}
class EmailPassword extends React.Component{
  
    constructor(props){
        super(props);
        this.state={...initialState}
        this.onInputChange= this.onInputChange.bind(this);
    }
    onInputChange(event){
        const {name,value}=event.target;
        this.setState({
            [name]:value
        })
    } 
    handleSubmit = async event =>{
        event.preventDefault();
        try{
            const {email} = this.state;
            const config ={
                url:'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email,config).then(()=>{
                this.props.history.push('/login');
            })
            .catch(()=>{
                const err = ['Email Not Found ! Please try again']
                this.setState({errors:err});
                })
        }
        catch(err){
            console.log(err);
        }
    }
    render(){
        const {email,errors} = this.state;
        return(
        <AuthWrapper headline="Email">
            {errors.length>0 && (
                <ul>
                    {errors.map((err,index)=>(
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            )}
             <div className="formWrap">
                 <form onSubmit={this.handleSubmit}>
                <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={this.onInputChange}/>
                <Button type="submit">Email Password</Button>
            </form>
            </div>
            </AuthWrapper>
        )
    }
}
export default withRouter(EmailPassword);