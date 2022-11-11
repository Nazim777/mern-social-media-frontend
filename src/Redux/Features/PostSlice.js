import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getAllTours,getSingleTour,createTour,getToursByUserId, searchTours, createPost,getTimeLinePost,getSingleUserPost,likePost,commentPost,deletePost,editPost} from "../Api/Api";



  export const timeLinePost = createAsyncThunk(
    "post/getpost",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getTimeLinePost(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const SingleUserPost = createAsyncThunk(
    "post/getsinglesuerpost",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getSingleUserPost(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const singleTour = createAsyncThunk(
    "tour/singletour",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getSingleTour(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  

  export const AddPost = createAsyncThunk(
    "post/addpost",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await  createPost(formData);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  
  export const PostDelete = createAsyncThunk(
    "post/postdelete",
    async ({id,toast}, { rejectWithValue }) => {
      try {
        const response = await deletePost(id);
        toast.success("post delete Successfully");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  export const PostEdit = createAsyncThunk(
    "post/postedit",
    async ({formData,id}, { rejectWithValue }) => {
      try {
        const response = await editPost(id,formData);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const TourSearch = createAsyncThunk(
    "tour/searchtour",
    async (search, { rejectWithValue }) => {
      try {
        const response = await searchTours(search);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const PostLike = createAsyncThunk(
    "post/postlike",
    async (id, { rejectWithValue }) => {
      try {
        const response = await likePost(id);
        // console.log(response.data)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const PostComment = createAsyncThunk(
    "post/comment",
    async ({id,userComment}, { rejectWithValue }) => {
      try {
        const response = await commentPost(id,userComment);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
const PostSlice= createSlice({
    name:'post',
    initialState:{
        
        error:'',
        loading:false,
        posts:[],
        // tour:{},
        post:{},
        // userTours:[],
        userPost:[],
        searchTours:[]



    },
    reducers:{
      setCurrentpage :(state,action)=>{
        state.currentPage = action.payload

      }
        

    },
    extraReducers: {

      
        [timeLinePost.pending]: (state, action) => {
          state.loading = true;
        },
        [timeLinePost.fulfilled]: (state, action) => {
          state.loading = false;
          state.posts = action.payload;
          
        },
        [timeLinePost.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [PostComment.pending]: (state, action) => {
          state.loading = true;
        },
        [PostComment.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:{id}} = action.meta
          state.post = action.payload
          state.posts = state.posts.map((item)=>item._id==id?action.payload:item)
          state.userPost = state.userPost.map((item)=>item._id==id?action.payload:item)
        },
        [PostComment.rejected]: (state, action) => {
           state.loading = false;
          state.error = action.payload.msg;
        },
        [singleTour.pending]: (state, action) => {
          state.loading = true;
        },
        [singleTour.fulfilled]: (state, action) => {
          state.loading = false;
          state.tour = action.payload;
        },
        [singleTour.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [AddPost.pending]: (state, action) => {
          state.loading = true;
        },
        [AddPost.fulfilled]: (state, action) => {
          state.loading = false;
          state.posts = [action.payload,...state.posts];
        },
        [AddPost.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [SingleUserPost.pending]: (state, action) => {
          state.loading = true;
        },
        [SingleUserPost.fulfilled]: (state, action) => {
          state.loading = false;
          state.userPost = action.payload;
        },
        [SingleUserPost.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [PostDelete.pending]: (state, action) => {
          state.loading = true;
        },
        [PostDelete.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:{id}} = action.meta
           
          if(id){
            state.userPost= state.userPost.filter((item)=>item._id !==id)
            state.posts= state.posts.filter((item)=>item._id !==id)
          }
        },
        [PostDelete.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [PostEdit.pending]: (state, action) => {
          state.loading = true;
        },
        [PostEdit.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:{id}} = action.meta
          // console.log(arg)
          if(id){
            state.userPost= state.userPost.map((item)=>item._id ==id?action.payload:item)
            state.posts= state.posts.map((item)=>item._id==id?action.payload:item)
          }
        },
        [PostEdit.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [TourSearch.pending]: (state, action) => {
          state.loading = true;
        },
        [TourSearch.fulfilled]: (state, action) => {
          state.loading = false;
          state.searchTours = action.payload;
        },
        [TourSearch.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
       
        [PostLike.pending]: (state, action) => {},
        [PostLike.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:id} = action.meta
          if(id){
            state.posts= state.posts.map((item)=>item._id==id?action.payload:item)
            state.userPost= state.userPost.map((item)=>item._id==id?action.payload:item)
          }
        },
        [PostLike.rejected]: (state, action) => {
           state.loading = false;
          state.error = action.payload.msg;
        },

        
       
       
      },
   
})


export default PostSlice.reducer 
export const {setCurrentpage} = PostSlice.actions