import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import Button from '@mui/material/Button';
import { useParams,useNavigate } from 'react-router-dom';
import { singleUserinfo } from '../../Redux/Features/UserSlice';
import { useDispatch,useSelector } from 'react-redux';
import { FriendRequestSentAndCancel,FriendRequestAccept,FriendRequestReject } from '../../Redux/Features/UserSlice';
import { setLoggeInuser } from '../../Redux/Features/UserSlice';
const Friends = () => {
    const {id} =useParams()
    const dispatch = useDispatch()
    const [sendRequest,setSentRequest] = useState([])
    const [pendingRequest,setPendingRequest] = useState([])


    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const {alluserData} = useSelector((state)=>state.user)
  const {user} = useSelector((state)=>state.user)
 
useEffect(()=>{
  const data = alluserData?.find(((item)=>item?._id==user?.data?._id))
  dispatch(setLoggeInuser(data))

},[id,alluserData])
const {loggedinuser} =useSelector((state)=>state.user)


// new 

useEffect(()=>{
  const data = [...alluserData]
    loggedinuser?.friends?.forEach((item)=>{
        const index = data.findIndex((d)=>d._id==item)
      data.splice(index,1)
        
    })

    loggedinuser?.pendingFriendRequest?.forEach((item)=>{
      const index = data.findIndex((d)=>d._id==item)
      data.splice(index,1)

    })
   
  setSentRequest([...data])
},[loggedinuser,alluserData])






// console.log(sendRequest)

const handleFrinedRquest = (id)=>{
  dispatch(FriendRequestSentAndCancel(id))


}




 useEffect(()=>{
    let data = []
  
    loggedinuser?.pendingFriendRequest?.forEach((item)=>{
      const newData = alluserData?.filter((d)=>d._id==item)
      data = [...data,...newData]
    })
    setPendingRequest([...data])
  },[loggedinuser])
  //console.log(pendingRequest)
  




const handleConfirm = (id) =>{
  dispatch(FriendRequestAccept(id))

}

const handleDelete = (id)=>{
  dispatch(FriendRequestReject(id))

}



  return (
    <div>
        <Topbar/>
       <div style={{display:'flex',justifyContent:'space-around',marginTop:'50px'}}>
        <div style={{flexBasis:'1',width:'100%'}}>
           <h3>People you may know</h3>


           {
                sendRequest&& sendRequest.map((item)=>item._id !== loggedinuser._id &&
        <>

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginTop:'20px'}}>
            
            <div>
                 <img src={item.profilePicture?serverPublic+item?.profilePicture:'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}  style={{width:'100px',height:'80px'}} alt="" 
                 />
               <div>
                <span>{item?.name}</span>
               </div>
 
             </div>
             <div>
                 <Button variant='contained' onClick={()=>handleFrinedRquest(item?._id)}>{item?.pendingFriendRequest?.includes(loggedinuser?._id)?'cancel request':'Add friend'} </Button>
             </div>
             <div>
                 <Button variant='contained'>Remove</Button>
             </div>
            
             
            </div>
 


                

              
        </>)
            }
           

        </div>
        <div style={{flexBasis:'1',width:'100%'}}>
            <h3>Friend Request</h3>
            {pendingRequest&& pendingRequest?.map((item)=><>

              <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginTop:'20px'}}>
            <div>
                <img src={item.profilePicture?serverPublic+item?.profilePicture:'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}  style={{width:'100px',height:'80px'}} alt="" />
                <div>
                  <span>{item?.name}</span>
                </div>
                

            </div>
            <div>
                <Button variant='contained' onClick={()=>handleConfirm(item?._id)}>Confirm</Button>

            </div>
            <div>
                <Button variant='contained' onClick={()=>handleDelete(item?._id)}>Delete</Button>
            </div>



           </div>
            
            
            
            
            </>)}

           


          


        </div>


       </div>
      
    </div>
  )
}

export default Friends
