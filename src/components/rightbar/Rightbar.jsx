import "./rightbar.css";
import { Users } from "../../DummyData";
import Online from "../online/Online";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Rightbar({profile}) {
  const {sinlgeuserInfo} = useSelector((state)=>state.user)
  const {alluserData} = useSelector((state)=>state.user)
  const [userFriend,setUserFriend] = useState([])
  const navigate = useNavigate()
 
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  
  useEffect(()=>{
    let data = []
    sinlgeuserInfo?.friends?.forEach((d)=>{
      let data2 = alluserData.filter((item)=>item._id==d)
     data = [...data,...data2]
    })

setUserFriend([...data])
  },[sinlgeuserInfo])
  //  console.log(userFriend)
// console.log(sinlgeuserInfo)
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Rahim</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="https://images.pexels.com/photos/6146931/pexels-photo-6146931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const handleClick = (id)=>{
    navigate(`/profile/${id}`)

  }
  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">lives In:</span>
            <span className="rightbarInfoValue">{sinlgeuserInfo?.livesin}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">works at:</span>
            <span className="rightbarInfoValue">{sinlgeuserInfo?.worksAt}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{sinlgeuserInfo?.relationship}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" style={{fontWeight:'bold'}}>followers:</span>
            <span className="rightbarInfoValue" style={{fontWeight:'bold'}}>{sinlgeuserInfo?.followers?.length}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" style={{fontWeight:'bold'}}>following:</span>
            <span className="rightbarInfoValue" style={{fontWeight:'bold'}}>{sinlgeuserInfo?.following?.length}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {userFriend&&userFriend?.map((item)=>
           <div className="rightbarFollowing" key={item?._id}>
           <img
             src={item.profilePicture?serverPublic+item?.profilePicture:'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
             alt=""
             className="rightbarFollowingImg"
             style={{width:'60px',height:'60px',margin:'10px'}}
             onClick={()=>handleClick(item?._id)}
           />
           <span className="rightbarFollowingName">{item?.name}</span>
         </div>
          )}

          {/* <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div> */}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
