import "./CloseFriend.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CloseFriend({user}) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:loggeInUser} = useSelector((state)=>state.user)

  const navigate = useNavigate()
  const handleClick = (id)=>{
    navigate(`/profile/${id}`)

  }
  return (
    
    <>
   
      {user._id!==loggeInUser?.data?._id &&<>
        <li className="sidebarFriend" style={{cursor:'pointer'}} onClick={()=>handleClick(user._id)}>
        <img className="sidebarFriendImg" src={user.profilePicture?serverPublic+user.profilePicture:'https://www.guidingtech.com/wp-content/uploads/Smiley-Thumbnail_4d470f76dc99e18ad75087b1b8410ea9.png'} alt="" />
      <span className="sidebarFriendName">{user.name}</span>
    </li>
      
      
      </>}
      
      </> 
    
  );
}