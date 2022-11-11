import "./profile.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditModal from "../../components/ProfileEditModal/EditModal";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { singleUserinfo } from "../../Redux/Features/UserSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {friendRequestAccept, upload } from "../../Redux/Api/Api";
import { userUpdate } from "../../Redux/Features/UserSlice";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { UserFollow,UserunFollow,Unfriend,FriendRequestSentAndCancel,FriendRequestAccept,alluserInfo} from "../../Redux/Features/UserSlice";
import { SingleUserPost } from "../../Redux/Features/PostSlice";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RecommendIcon from '@mui/icons-material/Recommend';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CancelIcon from '@mui/icons-material/Cancel';
import { setLoggeInuser } from "../../Redux/Features/UserSlice";
import { createChat } from "../../Redux/Api/Api";


export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [coverImage,setCoverImage] = useState('')
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const {sinlgeuserInfo} = useSelector((state)=>state.user)
  const {alluserData} = useSelector((state)=>state.user)
  
  // console.log(sinlgeuserInfo)
  const {id} = useParams()
  const imageRef = useRef()

  useEffect(()=>{
    dispatch(singleUserinfo(id))

  },[id])

  useEffect(()=>{
    dispatch(SingleUserPost(id))

  },[id])
  

  // this is for friend request sent, accept, cancel from user profile
  const {loggedinuser} =useSelector((state)=>state.user)
  useEffect(()=>{
    dispatch(alluserInfo())

  },[loggedinuser])
 // 


  const {userPost} = useSelector((state)=>state.post)
  const {user} = useSelector((state)=>state.user) 
  // console.log(serverPublic+user?.data?.profilePicture)
  const handleImage = (e)=>{
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setCoverImage(img)
    }
   }
  
 
  useEffect(()=>{
    const formValue = {
    
    }
    const uploadCoverPicture = async()=>{
      if(coverImage ){
        const data = new FormData();
        const fileName = Date.now() + coverImage.name;
        data.append("name", fileName);
        data.append("file",coverImage);
        formValue.coverPicture = fileName;
        
        try {
         
        await upload(data)
         console.log(formValue)
        } catch (err) {
          console.log(err);
        }
      }
      

      dispatch(userUpdate({id:user?.data?._id,formValue}))
    }


    
    
    uploadCoverPicture()
    

  },[coverImage])



  const handleFollow = ()=>{
    dispatch(UserFollow(id))

  }
  // console.log(sinlgeuserInfo)

  const handleUnFollow = ()=>{
    dispatch(UserunFollow(id))

  }


  // this is for friend request sent, accept, cancel from user profile
  const [sentRequestData,setSentRequestData] = useState({})
  useEffect(()=>{
    const data = alluserData?.find(((item)=>item._id==id))
    setSentRequestData({...data})
   

  },[id,alluserData])
// console.log(sentRequestData)


  useEffect(()=>{
    const data = alluserData?.find(((item)=>item?._id==user?.data?._id))
    dispatch(setLoggeInuser(data))

  },[id])
 



const handleSendandCancelFriendRequest = (id)=>{
  dispatch(FriendRequestSentAndCancel(id))
}

const handleConFirmRequest = (id)=>{
  dispatch(FriendRequestAccept(id))
}


const handleUnfriend = (id)=>{
  dispatch(Unfriend(id))
}


const handleMessage = async()=>{
  const chatsId = {
    senderId:user?.data?._id,
    receiverId:sinlgeuserInfo?._id
  }
  try {
    const data = await createChat(chatsId)
    if(data){
      navigate('/chat')
    }
  } catch (error) {
    console.log(error)
    
  }
  
}

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              /> */}
              {/* <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              /> */}
              <div style={{position:'relative'}}>
              <img
                className="profileCoverImg"
                src={
                  sinlgeuserInfo?.coverPicture
                    ? serverPublic+ sinlgeuserInfo?.coverPicture
                    : 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                }
                alt=""
              />
            <div style={{position:'absolute',top:'75%',right:'2%',zIndex:100}}>
              {user?.data?._id==id&&
              
              <>
              <Button variant="contained" startIcon={<EditIcon/>} sx={{background:'white',color:'black'}} onClick={()=>imageRef.current.click()}>add cover photo</Button>

              </>}
            
            <input className="shareOptionText" type="file" accept="image/" 
                     onChange={handleImage} name="image" style={{display:'none'}}  ref={imageRef} />
              


            </div>

            <div style={{position:'absolute',top:'100%',right:'15%',zIndex:100,}}>
              {user?.data?._id !==id&&
              
              <>
             
                
                {/* <Button variant="contained" onClick={()=>handleSendandCancelFriendRequest(id)}>{sentRequestData?.pendingFriendRequest?.includes(user?.data?._id)?'cancel request':'add friend'}</Button> */}

              
              
              {
                loggedinuser?.friends?.includes(id) || loggedinuser?.pendingFriendRequest?.includes(id)?
                <Button variant="contained" onClick={()=>loggedinuser?.pendingFriendRequest?.includes(id)?handleConFirmRequest(id):handleUnfriend(id)}>{loggedinuser?.pendingFriendRequest?.includes(id)?'confirm':'unfriend'}</Button>
                :
                <Button variant="contained" onClick={()=>handleSendandCancelFriendRequest(id)}>{sentRequestData?.pendingFriendRequest?.includes(user?.data?._id)?'cancel request':'add friend'}</Button>
              }

              </>}
            
            

            </div>


            <div style={{position:'absolute',top:'100%',right:'1%',zIndex:100,}}>
              {user?.data?._id !==id&&
              
              <>
              <Button variant="contained" onClick={handleMessage}>message</Button>

              </>}
            
            

            </div>





              </div>
             
              <img
                className="profileUserImg"
                src={
                  sinlgeuserInfo?.profilePicture
                    ?serverPublic+sinlgeuserInfo?.profilePicture
                    : 'assets/person/7.jpeg'
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{sinlgeuserInfo?.name}</h4>
                <span className="profileInfoDesc">{sinlgeuserInfo?.about}</span>
                
            </div>
           
            {user?.data?._id!==id&&
            <div style={{marginTop:'10px'}}>
            <Button variant="contained" onClick={sinlgeuserInfo?.followers?.includes(user?.data?._id)?handleUnFollow:handleFollow}>
              {sinlgeuserInfo?.followers?.includes(user?.data?._id)?'unfollow':'follow'}
            </Button>
            </div>
            }
            
            <div style={{marginTop:'10px',display:'flex',justifyContent:'flex-end'}}>
             {user?.data?._id==id&&
             <>
              <Button variant="contained" startIcon={<EditIcon/>} onClick={()=>setOpen(true)}>edit Profile</Button>
              <EditModal open={open} setOpen={setOpen}/>
             </>}
            </div>
          </div>
          <div className="profileRightBottom">
           
             
              <Feed userPost={userPost}/>
              
            
            
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
