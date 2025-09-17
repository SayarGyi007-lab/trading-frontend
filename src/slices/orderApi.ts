import { apiSlice } from "./api";

interface Order {
    order_id: number;
    user_id: number;
    product: { name: string };
    order_type: { name: string };
    user: { user_id: number; name: string; email: string };
    price: number | string; 
    volume: number;
    unit: string;
    timestamp: string; 
  }

interface CreateOrderInput {
    product_name: string
    order_type: "BUY" | "SELL"
    price: number
    volume: number
    unit: string
  }

interface updateOrder{
    order_id: number
    product_name?: string
    order_type?: "BUY" | "SELL"
    price?: number
    volume?: number,
    unit?: string
}

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getOrderByUserId:builder.query<{orders: Order[]},number>({
            query:(user_id)=>({
                url: `order/user/${user_id}`
            }),
            providesTags: ["Orders"]
        }),
        createOrder: builder.mutation<{ message: string; order: Order; matchingResult: any },CreateOrderInput>({
            query:(data)=>({
                url: "order/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Orders"]
        }),
        updateOrder: builder.mutation<{ message: string; updatedOrder: Order; matchingResult: any }, updateOrder>({
            query:({order_id, ...data})=>({
                url: `order/update/${order_id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Orders"]
        }),
        deleteOrder: builder.mutation<{ message: string }, number>({
            query:(order_id)=>({
                url:`order/delete/${order_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Orders'],
        }),
        getAllOrder: builder.query<{ orders: Order[] }, void>({
            query:()=>({
                url:"order/"
            }),
            providesTags: ["Orders"]
        })

    })
})

export const {useCreateOrderMutation, useGetOrderByUserIdQuery, useDeleteOrderMutation, useUpdateOrderMutation, useGetAllOrderQuery} = orderApiSlice