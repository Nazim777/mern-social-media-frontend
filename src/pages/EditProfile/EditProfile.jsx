import React,{useEffect, useState} from 'react'
import Topbar from '../../components/Topbar/Topbar'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { userUpdate } from '../../Redux/Features/UserSlice';
import { useDispatch,useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { upload,uploadMultiple} from '../../Redux/Api/Api'



export default function EditProfile({setOpen}) {
  const dispatch = useDispatch()
  const [profileImage,setProfileImage] = useState('')
  // const [coverImage,setCoverImage] = useState('')
  const init = {
   livesin:'',
   worksAt:'',
   relationship:'',
   about:''
  }
  const [user,setUser] =useState(init)
  const handleChange=(e)=>{
    setUser((prestate)=>({
        ...prestate,
        [e.target.name]:e.target.value
    }))
}

const handleImage = (e)=>{
  if (e.target.files && e.target.files[0]) {
    let img = e.target.files[0];
    setProfileImage(img)
  }
  

 }

 
// const handleImage2 = (e)=>{
//     if (e.target.files && e.target.files[0]) {
//       let img = e.target.files[0];
//       setCoverImage(img)
//     }

//     <div>
//       <p>update cover picture</p>
//         <input className="shareOptionText" type="file" accept="image/" 
//           onChange={handleImage2} name="file2"/>
//          </div>
         
 

//    }

   
const {user:users} = useSelector((state)=>state.user)

useEffect(()=>{
  setUser({
    livesin:users?.data?.livesin,
    worksAt:users?.data?.worksAt,
    relationship:users?.data?.relationship,
    about:users?.data?.about
  })

},[users])

   const handleClick = async()=>{
    const formValue = {
      ...user
      
    }

    if(profileImage ){
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      formValue.profilePicture = fileName;
      
      try {
       
      await upload(data)
       console.log(formValue)
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(userUpdate({id:users?.data?._id,formValue}))
   setOpen(false)

    
   
    
  }

  return (
    <div>

      
     <FormControl action="" onSubmit={(e)=>e.preventDefault()}>
        <div style={{display:'flex',justifyContent:'center', marginTop:'100px'}}>
         <div >
       <p>upload profile picture</p>
        <input className="shareOptionText" type="file" accept="image/" 
          onChange={handleImage} name="file1" />
         </div>
         

        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:'40px'}}>
          <div style={{marginRight:'10px'}}>
          <TextField
          label="lives in.." variant="filled" color="success"
          name="livesin"
          value={user.livesin}
           onChange={handleChange}
            placeholder="lives in.."
            
          />
          </div>
          <div>
          <TextField
          label="works at.." variant="filled" color="success"
          name="worksAt"
          value={user.worksAt}
          onChange={handleChange}
          placeholder="works at.."
            
          />
          </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:'40px'}}>
          <div style={{marginTop:'40px'}}>
          <TextField
          label="relationship.." variant="filled" color="success"
          name="relationship"
          value={user.relationship}
            onChange={handleChange}
            
          />
          </div>
          <div style={{marginTop:'40px',marginLeft:'10px'}}>
          <TextField
          label="about.." variant="filled" color="success"
          name="about"
          value={user.about}
            onChange={handleChange}
            
          />
          </div>
          </div>
          
        
        <div style={{marginTop:'40px',display:'flex',justifyContent:'center'}}>
          <Button type='submit' variant='outlined' onClick={handleClick}>submit</Button>
       </div>
       </FormControl>
      
    </div>
  )
}
