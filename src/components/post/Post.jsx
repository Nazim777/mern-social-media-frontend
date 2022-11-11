import "./post.css";
import { Users } from "../../DummyData";
import { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import {format} from 'timeago.js'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PostLike } from "../../Redux/Features/PostSlice";
import { useDispatch } from "react-redux";
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import { PostComment } from "../../Redux/Features/PostSlice";
import Comment from "../Comment/Comment";
import PostEditModal from "../PostEditModal/PostEditModal";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
export default function Post({ post }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const {alluserData} = useSelector((state)=>state.user)
  const {user} = useSelector((state)=>state.user)
const navigate =useNavigate()
const dispatch = useDispatch()
  const likeHandler =(id)=>{
    // setLike(isLiked ? like-1 : like+1)
    // setIsLiked(!isLiked)
    dispatch(PostLike(id))
 
    
  }
  const [expanded,setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const init = {
    comment:''
  }
  const [userComment,setUserComment] = useState(init)

  const handleComment = (e)=>{
    setUserComment({
      ...userComment,
      [e.target.name]:e.target.value
    })

  }
  const handleClick = (id)=>{
    if(!userComment?.comment==''){
      dispatch(PostComment({id,userComment}))
      setUserComment(init)
    }
  }
  const [open,setOpen] = useState(false)
  return (
    <div className="post" >
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={serverPublic+alluserData.filter((u) => u._id == post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {post?.userName}
            </span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
           {post?.userId==user?.data?._id && <MoreVertIcon onClick={()=>setOpen(true)}  style={{cursor:'pointer'}}/>}
           <PostEditModal open={open} setOpen={setOpen} id={post?._id}/>
           
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={serverPublic+post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img className="likeIcon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyxnFNXg9_Vk7UXLtqezfQJdHevpfKUwSmZ9Odls0&s" onClick={()=>likeHandler(post?._id)} alt="" /> */}
            {/* <img className="likeIcon" src="https://image.similarpng.com/very-thumbnail/2020/07/Love-icons-social-media-vector-PNG.png" onClick={()=>likeHandler(post?._id)} alt="" /> */}
           
            {post?.likes?.includes(user?.data?._id)?<FavoriteOutlinedIcon style={{color:'red',cursor:'pointer',marginRight:'10px'}} onClick={()=>likeHandler(post?._id)}/>:<FavoriteBorderOutlinedIcon style={{cursor:'pointer',marginRight:'10px'}} onClick={()=>likeHandler(post?._id)}/>}
            <span className="postLikeCounter">{post?.likes?.length} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"  expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"><TextsmsOutlinedIcon style={{fontSize:'20px',marginBottom:'-4px'}}/> {post?.comments?.length} comments</span>
          </div>
        </div>
       
       <Collapse in={expanded} timeout="auto" unmountOnExit>
         <hr />
        
       {
          post?.comments?.map((item)=>(<Comment key={item.id} comment={item}/>))
        }
       
        
       <Box sx={{ '& > :not(style)': { m: 1 },display:'flex',marginTop:'20px' }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Write a  comment...
        </InputLabel>
        <Input
        name="comment"
        value={userComment.comment}
        onChange={handleComment}
        
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <div style={{display:'flex',justifyContent:'flex-end'}}>
      <Button startIcon={<CommentIcon/>} sx={{marginRight:'-300px'}} type='submit' onClick={()=>handleClick(post?._id)} />
      </div>
      </Box>
       </Collapse>
      </div>
    </div>
  );
}
