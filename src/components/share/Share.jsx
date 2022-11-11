import "./share.css";
import { useRef, useState } from "react";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import { upload } from "../../Redux/Api/Api";
import { AddPost } from "../../Redux/Features/PostSlice";
import { useDispatch,useSelector } from "react-redux";
export default function Share() {
  const dispatch = useDispatch()
  const imageRef = useRef();
  const [postImage,setPostImage] = useState('')
  const init = {
   desc:'' 
  }
  const [post,setPost] =useState(init)
  const handleChange=(e)=>{
    setPost((prestate)=>({
        ...prestate,
        [e.target.name]:e.target.value
    }))
}

const handleImage = (e)=>{
  if (e.target.files && e.target.files[0]) {
    let img = e.target.files[0];
    setPostImage(img)
  }
  

 }

 
   const handleClick = async ()=>{
    const userPost = {
      desc:post.desc,
    }

    if(postImage ){
      const data = new FormData();
      const fileName = Date.now() + postImage.name;
      data.append("name", fileName);
      data.append("file", postImage);
      userPost.image = fileName;
      
      try {
      await upload(data)
      } catch (err) {
        console.log(err);
      }
    }


dispatch(AddPost(userPost))
setPost(init)
setPostImage('')
    
    
  }
// console.log(postImage)
const {user} = useSelector((state)=>state.user)
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user?.data?.profilePicture?serverPublic+user?.data?.profilePicture:'https://www.guidingtech.com/wp-content/uploads/Smiley-Thumbnail_4d470f76dc99e18ad75087b1b8410ea9.png'} alt="" />
          <input
          name="desc"
          value={post.desc}
          onChange={handleChange}
            placeholder="What's in your mind?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        {postImage && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(postImage)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setPostImage(null)} />
          </div>
        )}
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption" onClick={()=>imageRef.current.click()}>
                    <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input className="shareOptionText" type="file" accept="image/" 
                     onChange={handleImage} name="image" style={{display:'none'}}  ref={imageRef} />
                </div>
                <div className="shareOption">
                    <LabelIcon htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <RoomIcon htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" onClick={handleClick}>Share</button>
        </div>
      </div>
    </div>
  );
}
