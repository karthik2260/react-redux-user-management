import { createSlice } from "@reduxjs/toolkit";


const AuthSlice= createSlice({
    name:'Auth',
    initialState:{
        authUser: JSON.parse(localStorage.getItem('authUser')) || null,
         
    },
    reducers:{
        signup:(state,action)=>{
               state.authUser=action.payload.data
               localStorage.setItem('authUser', JSON.stringify(action.payload.data));
        },
        logout:(state)=>{
            state.authUser=null
            localStorage.removeItem('authUser');
        },
        login:(state,action)=>{
            state.authUser=action.payload.data
            localStorage.setItem('authUser', JSON.stringify(action.payload.data));
        },
        updateProfile: (state, action) => {
            if (state) {
                      
                      
                state.authUser.profilePic = action.payload;
                localStorage.setItem("authUser", JSON.stringify(state.authUser));
            }}
        

    }
})
export const {signup,logout,login,updateProfile}=AuthSlice.actions

export default AuthSlice.reducer