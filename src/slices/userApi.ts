import { apiSlice } from "./api"

interface loginInputs{
    email: string,
    password: string
}

interface registerInputs extends loginInputs{
    name: string,
    phone: string
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query:(data:loginInputs)=>({
                url: "/user/login",
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation({
            query:(data:registerInputs)=>({
                url: "/user/register",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url: "user/logout",
                method: "DELETE",
            })
        })
    }),

})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation } = userApiSlice