import React from 'react'
import { useSelector } from 'react-redux';

const Comment = ({comment}) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const {alluserData} = useSelector((state)=>state.user)
    
  return (
   
        <div style={{display:'flex',justifyContent:'flex-start',marginTop:'15px'}}>
            <div>
               <img src={  serverPublic+alluserData.filter((item)=>item?._id==comment?.id)[0]?.profilePicture} alt="" style={{width:'40px',height:'40px',borderRadius:'50%',background:'orange'}}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',marginLeft:'15px'}}>
                <div style={{display:'flex',justifyContent:'flex-start'}}>
                {comment.name}
                </div>
                <div >
                    {comment.comment}
                </div>
            </div>

            
        </div>
       
    
  )
}

export default Comment
// https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg