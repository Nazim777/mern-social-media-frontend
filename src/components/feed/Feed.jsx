import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../DummyData";
import { timeLinePost } from "../../Redux/Features/PostSlice";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Stories from "../Stories/Stories";

export default function Feed({userPost,homepage}) {
  const {user} = useSelector((state)=>state.user)
  const {posts} = useSelector((state)=>state.post)
//  console.log(posts)
  const dispatch = useDispatch()
useEffect(()=>{
dispatch(timeLinePost(user?.data?._id))
},[user?.data?._id])
// console.log(userPost)
  return (
    <div className="feed">
      <div className="feedWrapper">
        {
          homepage&&<Stories/>
        }
          
        <Share />
        

        {
          userPost?userPost?.map((p) => (
            <Post key={p.id} post={p}  />
          )):posts?.map((p) => (
            <Post key={p.id} post={p}  />
          ))
        }
        
        {/* {posts?.map((p) => (
          <Post key={p.id} post={p}  />
        ))} */}
      </div>
    </div>
  );
}
