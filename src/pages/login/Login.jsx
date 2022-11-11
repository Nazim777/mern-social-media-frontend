import "./login.css";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Features/UserSlice";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const init = {
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
  if(user.email&&user.password){
    dispatch(login({toast,navigate,input:user}))

  }else{
    toast.error('all field required!')
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
          Bring the best of your authentic self to every opportunity.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email"  type='email' name="email" value={user.email} onChange={handleChange}  className="loginInput" />
            <input placeholder="Password" type='password' name="password" value={user.password} onChange={handleChange} className="loginInput" />
            <button className="loginButton" type="submit" onClick={handleSubmit}>Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton"  onClick={()=>navigate('/register')}>
              Create a New Account
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
