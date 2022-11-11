import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Features/UserSlice";
import PostSlice from "../Features/PostSlice";
const store= configureStore({
  reducer:{
      user:UserSlice,
      post:PostSlice
  }
})
export default store