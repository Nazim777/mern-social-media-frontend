import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { alluser, singleUser, updateUser, userLogin,userRegister,followUser,unfollowUser,friendRequestSent,friendRequestAccept,friendRequestReject,unfriend } from "../Api/Api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ input, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await userLogin( input);
        toast.success("Login Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const register = createAsyncThunk(
    "auth/register",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await userRegister(formValue);
        toast.success("Register Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const userUpdate = createAsyncThunk(
    "user/update",
    async ({ formValue,id }, { rejectWithValue }) => {
      // console.log(id)
      try {
        const response = await updateUser(id,formValue);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const singleUserinfo = createAsyncThunk(
    "user/singleuser",
    async (id, { rejectWithValue }) => {
      // console.log(id)
      try {
        const response = await singleUser(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const alluserInfo = createAsyncThunk(
    "user/alluser",
    async (_, { rejectWithValue }) => {
     
      try {
        const response = await alluser();
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const UserFollow = createAsyncThunk(
    "user/followuser",
    async (id , { rejectWithValue }) => {
      // console.log(id)
      try {
        const response = await followUser(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const UserunFollow = createAsyncThunk(
    "user/unfollowing",
    async (id , { rejectWithValue }) => {
      try {
        const response = await unfollowUser(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const FriendRequestSentAndCancel = createAsyncThunk(
    "user/friendrequestsentandcancel",
    async (id , { rejectWithValue }) => {
      try {
        const response = await friendRequestSent(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const FriendRequestAccept = createAsyncThunk(
    "user/friendrequestaccept",
    async (id , { rejectWithValue }) => {
      try {
        const response = await friendRequestAccept(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const FriendRequestReject = createAsyncThunk(
    "user/friendrequestreject",
    async (id , { rejectWithValue }) => {
      try {
        const response = await friendRequestReject(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const Unfriend = createAsyncThunk(
    "user/unfriend",
    async (id , { rejectWithValue }) => {
      try {
        const response = await unfriend(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
const Userslice= createSlice({
    name:'user',
    initialState:{
        
        error:'',
        loading:false,
        user:null,
        sinlgeuserInfo:{},
        alluserData:[],
        loggedinuser:{}


    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
          },
          setLogout: (state, action) => {
            localStorage.clear();
            state.user = null;
          },
          setLoggeInuser:(state,action)=>{
            state.loggedinuser = action.payload
          }

    },
    extraReducers: {
        [login.pending]: (state, action) => {
          state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
          state.loading = false;
          localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
          state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [register.pending]: (state, action) => {
          state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
          state.loading = false;
          localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
          state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [userUpdate.pending]: (state, action) => {
          state.loading = true;
        },
        [userUpdate.fulfilled]: (state, action) => {
          state.loading = false;
          state.sinlgeuserInfo  = action.payload;
        },
        [userUpdate.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [singleUserinfo.pending]: (state, action) => {
          state.loading = true;
        },
        [singleUserinfo.fulfilled]: (state, action) => {
          state.loading = false;
          state.sinlgeuserInfo = action.payload;
        },
        [singleUserinfo.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [alluserInfo.pending]: (state, action) => {
          state.loading = true;
        },
        [alluserInfo.fulfilled]: (state, action) => {
          state.loading = false;
          state.alluserData = action.payload;
        },
        [alluserInfo.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [UserFollow.pending]: (state, action) => {
          state.loading = true;
        },
        [UserFollow.fulfilled]: (state, action) => {
          state.loading = false;
          state.sinlgeuserInfo = action.payload
          const {arg:id} = action.meta
          if(id){
            state.alluserData = state.alluserData.map((item)=>item._id==id?action.payload:item)
          }
        },
        [UserFollow.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [UserunFollow.pending]: (state, action) => {
          state.loading = true;
        },
        [UserunFollow.fulfilled]: (state, action) => {
          state.loading = false;
          state.sinlgeuserInfo = action.payload
          const {arg:id} = action.meta
          if(id){
            state.alluserData = state.alluserData.map((item)=>item._id==id?action.payload:item)
          }
        },
        [UserunFollow.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [FriendRequestSentAndCancel.pending]: (state, action) => {
          state.loading = true;
        },
        [FriendRequestSentAndCancel.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:id} = action.meta
          
          if(id){
            state.alluserData = state.alluserData.map((item)=>item._id==id?action.payload:item)
          }
        },
        [FriendRequestSentAndCancel.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [FriendRequestAccept.pending]: (state, action) => {
          state.loading = true;
        },
        [FriendRequestAccept.fulfilled]: (state, action) => {
          state.loading = false;
         
           state.loggedinuser = action.payload
          
        },
        [FriendRequestAccept.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [FriendRequestReject.pending]: (state, action) => {
          state.loading = true;
        },
        [FriendRequestReject.fulfilled]: (state, action) => {
          state.loading = false;
          
          state.loggedinuser = action.payload
          
        },
        [FriendRequestReject.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [Unfriend.pending]: (state, action) => {
          state.loading = true;
        },
        [Unfriend.fulfilled]: (state, action) => {
          state.loading = false;
           state.loggedinuser = action.payload
          console.log(action.payload)
        },
        [Unfriend.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        
        
       
      },
   
})


export default Userslice.reducer 
export const  {setUser, setLogout,setLoggeInuser} = Userslice.actions