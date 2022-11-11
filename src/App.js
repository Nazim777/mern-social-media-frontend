import './App.css';
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EditProfile from './pages/EditProfile/EditProfile';
import SinglePost from './pages/SinglePost/SinglePost';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {setUser} from '../src/Redux/Features/UserSlice'
import {useSelector} from 'react-redux'
import Friends from './pages/Friends/Friends';
import Chat from './pages/Chat/Chat';




function App() {
  

  const dispatch = useDispatch()
  const loggedInuser = JSON.parse(localStorage.getItem('profile'))
  useEffect(()=>{
    dispatch(setUser(loggedInuser))

  },[])
const {user} = useSelector((state)=>state.user)


  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route  path='/' element={user?<Home/>:<Navigate to={'/login'}/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={!user?<Login/>:<Navigate to={'/'}/>}/>
        <Route path='/profile/:id' element={user?<Profile/>:<Navigate to={'/login'}/>}/>
        <Route path='/editprofile' element={user?<EditProfile/>:<Navigate to={'/login'}/>}/>
        <Route path='/singlepost/:id' element={<SinglePost/>}/>
        <Route  path='/friend/:id' element={user?<Friends/>:<Navigate to={'/login'}/>} />
        <Route  path='/chat' element={user?<Chat/>:<Navigate to={'/login'}/>} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
