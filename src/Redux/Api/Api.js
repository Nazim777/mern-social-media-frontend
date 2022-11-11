import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:5000'
})


api.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

 // console.log(JSON.parse(localStorage.getItem("profile")).token)

export const userRegister = (formData) => api.post("/register", formData);
export const userLogin = (formData) => api.post("/login", formData);
export const getAllTours = (page) =>api.get(`/getalltour?page=${page}`)
export const getSingleTour =(id)=>api.get(`/singletour/${id}`)
export const getToursByUserId =(id)=>api.get(`/gettoursbyuserid/${id}`)
export const searchTours =(search)=>api.get(`/search?search=${search}`)
export const updateUser = (id,formData) => api.put(`updateuser/${id}`,formData)
export const upload = (data) => api.post('/',data)
export const singleUser = (id) => api.get(`/singleuser/${id}`)
export const alluser = ()=>api.get('/alluser')
export const followUser = (id)=>api.put(`/follow/${id}`)
export const unfollowUser = (id) =>api.put(`/unfollow/${id}`)
export const createPost = (formData) =>api.post('/createpost',formData)
export const getTimeLinePost = (id) =>api.get(`/timelinepost/${id}`)
export const getSingleUserPost = (id) =>api.get(`/singleuserpost/${id}`)
export const likePost =(id)=>api.put(`/postlike/${id}`)
export const commentPost =(id,userComment)=>api.put(`/postcomment/${id}`,userComment)
export const deletePost = (id) =>api.delete(`/deletepost/${id}`)
export const editPost =(id,formData)=>api.put(`/updatepost/${id}`,formData)
export const friendRequestSent =(id)=>api.put(`/friendrequest/${id}`)
export const friendRequestAccept =(id)=>api.put(`/friendrequestaccept/${id}`)
export const friendRequestReject =(id)=>api.put(`/rejectfriendrequest/${id}`)
export const unfriend =(id)=>api.put(`/unfriend/${id}`)
export const userChats = (userId)=>api.get(`/userchat/${userId}`)
export const addMessage = (data) =>api.post('/createmessage',data)
export const getMessages = (chatId) =>api.get(`/getmessage/${chatId}`)
export const createChat = (chatsId) => api.post('/createchat',chatsId)











// if(profileImage){


//   const data = new FormData();
//   const fileName = Date.now() + profileImage.name;
//   data.append("name", fileName);
//   data.append("file", profileImage);
//   formValue.profilePicture = fileName;
//   // console.log(formValue);
//   try {
//    await upload(data)
//   } catch (err) {
//     console.log(err);
//   }
// }