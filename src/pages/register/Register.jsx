import "./register.css";
import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { register } from "../../Redux/Features/UserSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const init = {
    name:'',
    email:'',
    password:'',
    
  }
  const [user,setUser] =useState(init)
const handleChange = (e)=>{
  setUser({
    ...user,
    [e.target.name]:e.target.value
  })
}

const handleSubmit =(e) =>{
  e.preventDefault()
  if(user.name&&user.email&&user.password){
    dispatch(register({formValue:user,navigate,toast}))


  }else{
    toast.error('all fields required!')
  }
  
}

const {error} = useSelector((state)=>state.user)


useEffect(()=>{
  
error&& toast.error(error)

},[error])
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">NZMsocial</h3>
          <span className="loginDesc">
            {/* Connect with friends and the world around you on NZMsocial. */}
            Bring the best of your authentic self to every opportunity.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="name" name="name" value={user.name} onChange={handleChange} className="loginInput" />
            <input placeholder="Email" type='email' name="email" value={user.email} onChange={handleChange} className="loginInput" />
            <input placeholder="Password" type='password' name="password" value={user.password} onChange={handleChange} className="loginInput" />
            <button className="loginButton" type="submit" onClick={handleSubmit}>Sign Up</button>
            <button className="loginRegisterButton" onClick={()=>navigate('/login')}>
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
