import './Topbar.css'

// import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { setLogout } from '../../Redux/Features/UserSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
export default function Topbar() {
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const {user} = useSelector((state)=>state.user)

  if (user?.token) {
    const decodedToken = jwtDecode(user?.token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }



  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo" onClick={()=>navigate('/')}>NZMsocial</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon onClick={()=>navigate(`/friend/${user?.data?._id}`)}/>
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div className="topbarIconItem">
            <ChatIcon onClick={()=>navigate(`/chat`)}/>
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            
          <Badge color="secondary" badgeContent={0}>
            <AccountCircleIcon onClick={()=>setOpen(true)}/>
            <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            
            open={open}
            onClose={()=>setOpen(false)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
      >
        {/*  */}
        <MenuItem  onClick={()=>navigate(`/profile/${user?.data?._id}`)}> Profile</MenuItem>
        <MenuItem onClick={()=>dispatch(setLogout()) } >Logout</MenuItem>
      </Menu>
        
        </Badge>
          </div>
        </div>
        {/* <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/> */}
      </div>
    </div>
  );
}