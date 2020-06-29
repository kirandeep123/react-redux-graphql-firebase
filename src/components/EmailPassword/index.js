import React,{useState} from 'react';
import './styles.scss';
import {withRouter} from 'react-router-dom';


import AuthWrapper from './../AuthWrapper';
import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import {auth} from './../../firebase/utils';


const EmailPassword =props =>{
    const [email,setEmail]=useState("");
    const [errors,setErrors]=useState([]);
   
   const handleSubmit = async event =>{
        event.preventDefault();
        try{
            const config ={
                url:'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email,config).then(()=>{
                props.history.push('/login');
            })
            .catch(()=>{
                console.log(" catch block")
                const err = ['Email Not Found ! Please try again']
                setErrors(err);
                })
        }
        catch(err){
            console.log(err);
        }
    }
   
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
                 <form onSubmit={handleSubmit}>
                <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={e=>setEmail(e.target.value)}/>

                <Button type="submit">Email Password</Button>
            </form>
            </div>
            </AuthWrapper>
        )
    }

export default withRouter(EmailPassword);