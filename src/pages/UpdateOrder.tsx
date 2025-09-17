import { useGetAllOrderQuery, useUpdateOrderMutation } from '../slices/orderApi'
import { useNavigate, useParams } from 'react-router-dom'
import * as z from 'zod'
import { updateOrderSchema } from '../schema/order/update.schema'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { units } from './CreateOrder'
import bgImage from "../assets/ec6.jpeg"

type FormInputs = z.infer<typeof updateOrderSchema>

function UpdateOrder() {
  const { data } = useGetAllOrderQuery()
  const [updateOrder, { isLoading }] = useUpdateOrderMutation()
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const order = data?.orders.find(o => o.order_id === Number(orderId))

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: {
      product_name: order?.product.name,
      order_type: order?.order_type.name as "BUY" | "SELL",
      price: order?.price as number,
      volume: order?.volume,
      unit: order?.unit
    }
  })

  const submit: SubmitHandler<FormInputs> = async (data) => {
    if (!orderId) return
    try {
      await updateOrder({ order_id: Number(orderId), ...data }).unwrap()
      reset()
      toast.success("Order updated successfully")
      navigate("/order")
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
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
            <h2 className="text-4xl font-bold text-white mb-4">Update Your Order</h2>
            <p className="text-gray-200 mb-6 text-lg">
              Make changes to your buy/sell order quickly and safely. Orders are updated instantly once submitted.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-300 mb-2"><strong>Tips for Updating</strong></p>
              <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                <li>Check your product and quantity carefully before updating.</li>
                <li>Updated orders are matched automatically based on price and type.</li>
                <li>Contact support if you experience any issues.</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-gray-300 mb-2"><strong>Need Help?</strong></p>
              <p className="text-sm text-gray-400">Email us at <span className="text-blue-400">support@tradex.com</span></p>
            </div>
          </div>

          <div className="md:w-1/2 flex items-center">
            <div className="w-full p-8 bg-black/30 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-gray-100 mb-4 text-center">Update Order Details</h3>

              {order ? (
                <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1">Product</label>
                    <input
                      {...register("product_name")}
                      placeholder="Product Name"
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90 text-gray-800"
                    />
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
                      {...register("volume")}
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
                    disabled={isSubmitting || isLoading}
                    className="w-full py-3 mt-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {isSubmitting || isLoading ? "Updating..." : "Update Order"}
                  </button>
                </form>
              ) : (
                <p className="text-center text-gray-200">Order not found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateOrder
