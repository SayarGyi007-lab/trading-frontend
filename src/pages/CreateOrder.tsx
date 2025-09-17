import * as z from 'zod'
import { createOrderSchema } from '../schema/order/create.schema'
import { useCreateOrderMutation } from '../slices/orderApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useGetAllProductsQuery } from '../slices/productApi'
import bgImage from "../assets/ec5.jpeg";

export const units = [
  "Kilogram",
  "Item",
  "Liter",
  "Meter",
  "Bag",
  "Pack",
  "Centimeter",
  "Gram",
] as const

type FormInputs = z.infer<typeof createOrderSchema>

function CreateOrder() {
  const [createOrder , {isLoading}] = useCreateOrderMutation()
  const { data: products, isLoading: isProductsLoading } = useGetAllProductsQuery()
  const navigate = useNavigate()
  const userInfo =  useSelector((state:RootState)=>state.auth.userInfo)

  const {register, handleSubmit, formState:{errors,isSubmitting}, reset } = useForm<FormInputs>({
    resolver: zodResolver(createOrderSchema)
  })

  const submit: SubmitHandler<FormInputs> = async(data)=>{
    try {
      await createOrder(data).unwrap()
      reset()
      toast.success("Order created successfully")
      navigate("/order")
    } catch (err:any) {
      toast.error(err?.data?.message || err.message)
    }
  }

  if (isProductsLoading) {
    return <p className="text-center text-gray-300 mt-6">Loading products...</p>
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-12 items-stretch">
          <div className="md:w-1/2 flex flex-col justify-center p-6">
            <h2 className="text-4xl font-bold text-white mb-4">Create Order</h2>
            <p className="text-gray-200 mb-6 text-lg">
              Fill out the details below to place your buy/sell order quickly and securely.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-gray-300 mb-3">
                <strong>How it works</strong>
              </p>
              <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                <li>Orders are matched automatically based on price and type.</li>
                <li>Volume and unit determine matching priority for bulk trades.</li>
                <li>Double-check price & volume before submitting — trades are listed instantly.</li>
              </ul>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              Need help? Contact support@tradex.com
            </p>
          </div>

          <div className="md:w-1/2 flex items-center">
  <div className="w-full p-8 bg-black/30 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col gap-4">
    <h3 className="text-2xl font-bold text-white mb-4 text-center">Order Details</h3>

    {userInfo ? (
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Product</label>
          <select
            {...register("product_name")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90 text-gray-800"
          >
            <option value="">Select Product</option>
            {products?.map((product) => (
              <option key={product.product_id} value={product.name}>{product.name}</option>
            ))}
          </select>
          {errors.product_name && <p className="text-red-400 text-sm mt-1">{errors.product_name.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Order Type</label>
          <select
            {...register("order_type")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90 text-gray-800"
          >
            <option value="">Select Order Type</option>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
          {errors.order_type && <p className="text-red-400 text-sm mt-1">{errors.order_type.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            placeholder="Enter price"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90 text-gray-800"
          />
          {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Volume</label>
          <input
            type="number"
            {...register("volume", { valueAsNumber: true })}
            placeholder="Enter volume"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90 text-gray-800"
          />
          {errors.volume && <p className="text-red-400 text-sm mt-1">{errors.volume.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Unit</label>
          <select
            {...register("unit")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90 text-gray-800"
          >
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          {errors.unit && <p className="text-red-400 text-sm mt-1">{errors.unit.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading || isSubmitting ? "Creating..." : "Create Order"}
        </button>

        <p className="text-center text-xs text-gray-300 mt-2">
          Orders are matched automatically based on price and type. Please double-check your details.
        </p>
      </form>
    ) : (
      <p className="text-center text-gray-200">You must be logged in to create an order.</p>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  )
}

export default CreateOrder
