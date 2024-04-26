import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
      
         LogOutStart:(state)=>{
            state.loading=true;
        },
        LogOutSuccess:(state,action)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        LogOutFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
       
    }
});

export const {signInStart,signInFailure,signInSuccess,LogOutStart,LogOutSuccess,LogOutFailure}=userSlice.actions;

export default  userSlice.reducer;