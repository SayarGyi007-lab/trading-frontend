import { apiSlice } from "./api"

export interface Product{
    product_id: number,
    name: string
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllProducts: builder.query<Product[],void>({
            query:()=>({
                url: "/product",
                method: "GET"
            }),
            transformResponse: (response: { products: Product[] }) => response.products,
        }),
        addProduct: builder.mutation<{message: string, product: Product},{name: string}>({
            query:(data)=>({
                url: "/product/add",
                method: "POST",
                body: data
            })
        }),
        deleteProduct: builder.mutation<{ message: string }, number>({
            query: (product_id) => ({
              url: `/product/delete/${product_id}`,
              method: "DELETE",
            }),
          }),
    })
})

export const {useAddProductMutation, useGetAllProductsQuery, useDeleteProductMutation} = productApiSlice