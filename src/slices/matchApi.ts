import { apiSlice } from "./api";

export interface Matching{
    matching_id: number
    price: string
    buy_price?: string
    volume: number
    timestamp: string
    product: { name: string }
    seller: { name: string, phone: string }
    buyer: { name: string, phone: string }
    unit: string
  }

export const matchApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllMatchings: builder.query<{ matchings: Matching[] }, void>({
            query: () => `/matching`, providesTags: ["Matching"]
        }),
        getUserMatchings: builder.query<{ matchings: Matching[] }, void>({
            query: () => `/matching/matchings`,providesTags: ["Matching"]
        }),
    })
})

export const {useGetAllMatchingsQuery, useGetUserMatchingsQuery} = matchApiSlice