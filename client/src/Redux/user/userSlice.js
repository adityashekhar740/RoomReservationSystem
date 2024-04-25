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
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserStart:(state)=>{
            state.loading=true
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser=null,
            state.loading = false,
            state.error=null
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload,
            state.loading=null
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

export const {signInStart,signInFailure,signInSuccess,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,deleteUserSuccess,deleteUserFailure,LogOutStart,LogOutSuccess,LogOutFailure}=userSlice.actions;

export default  userSlice.reducer;