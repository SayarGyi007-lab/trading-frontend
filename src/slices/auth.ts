import { createSlice } from "@reduxjs/toolkit"

interface AuthSlice {
    userInfo:{
        _id: number,
        email: string,
        name: string,
        role: "ADMIN" | "USER"
    }| null
}

const initialState: AuthSlice ={
    userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo") as string): null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUserInfo: (state, action)=>{
            state.userInfo = action.payload
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        clearUserInfo:(state)=>{
            state.userInfo = null,
            localStorage.removeItem("userInfo")
        }
    }

})

export const {setUserInfo, clearUserInfo} = authSlice.actions
export default  authSlice.reducer