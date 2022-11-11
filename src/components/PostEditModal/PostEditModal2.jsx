import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector,useDispatch } from 'react-redux';
import { PostEdit } from '../../Redux/Features/PostSlice';
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

const PostEditModal2 = ({open,setOpen,id}) => {
  const {posts} = useSelector((state)=>state.post)
  const dispatch = useDispatch()
    const [post,setPost] = useState({
        desc:''
    })

useEffect(()=>{
  const userData = posts?.find((item)=>item._id==id)
  if(userData){
    setPost({
      desc:userData.desc
    })
  }

},[id])

// console.log(post)

const handleChange = (e)=>{
    setPost({
        ...post,
        [e.target.name] : e.target.value
        
    })

}
const handleClick = ()=>{
  dispatch(PostEdit({formData:post,id}))
  setOpen(false)
}

  return (
    <div>
      <Modal  open={open}
      
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={style}>
          
          <div style={{display:'flex'}}>
          <textarea
          name="desc"
          value={post.desc}
           onChange={handleChange}
            
          />
          
          <Button  variant='contained' style={{marginLeft:'20px'}} onClick={handleClick} >Submit</Button>
         


          </div>
          
         
          
        </Box>

      </Modal>
      
    </div>
  )
}

export default PostEditModal2