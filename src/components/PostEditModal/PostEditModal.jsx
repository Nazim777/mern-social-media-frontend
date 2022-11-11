import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditProfile from '../../pages/EditProfile/EditProfile';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { PostDelete } from '../../Redux/Features/PostSlice';
import {toast} from 'react-toastify'
import PostEditModal2 from './PostEditModal2';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
const PostEditModal = ({open,setOpen,id}) => {
    const dispatch = useDispatch()

const handleDelete = ()=>{
    if(id){
        dispatch(PostDelete({toast,id})) 
        setOpen(false) 
    }
}

const [open2,setOpen2] = useState(false)
  return (
    <div>
      <Modal  open={open}
      
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={style}>
          
          <List sx={style2} component="nav" aria-label="mailbox folders">
     
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Edit" onClick={()=>setOpen2(true)} />
        <PostEditModal2 open={open2} setOpen={setOpen2} id={id}/>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Delete" onClick={handleDelete} />
      </ListItem>
      <Divider light />
     
    </List>
          </Box>

      </Modal>
      
    </div>
  )
}

export default PostEditModal
