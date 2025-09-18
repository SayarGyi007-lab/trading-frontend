import { useDeleteOrderMutation, useGetAllOrderQuery } from '../slices/orderApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import bgImg from "../assets/ec1.jpg"

function OrdersList() {
  const { data, isLoading } = useGetAllOrderQuery()
  const [deleteOrder] = useDeleteOrderMutation()
  const navigate = useNavigate()
  const userInfo = useSelector((state: RootState) => state.auth.userInfo) 
  const currentId = userInfo?._id

 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-200 text-lg animate-pulse">Loading orders...</p>
      </div>
    )
  }

  if (!data?.orders || data.orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-gray-200 text-center text-lg">No orders found.</p>
      </div>
    )
  }

  const ownerOrders = data.orders.filter(order => order.user_id === Number(currentId) && order.volume > 0)
  const otherOrders = data.orders.filter(order => order.user_id !== Number(currentId) && order.volume > 0)

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage:  `url(${bgImg})` }} 
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 space-y-12 z-10">
        <h1 className="text-5xl font-extrabold mb-10 text-white text-center drop-shadow-lg">
           Orders
        </h1>

        {ownerOrders.length > 0 && (
          <div className="bg-white/80 rounded-3xl shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Orders</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-50">
              {ownerOrders.map(order => (
                <div
                  key={order.order_id}
                  className="relative min-w-[280px] flex-shrink-0 bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-xl rounded-3xl p-6 border border-indigo-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-bold text-indigo-800 mb-2">{order.product?.name}</h3>
                  <p className="text-sm text-indigo-700 mb-1">
                    <span className="font-semibold">Type:</span> {order.order_type?.name}
                  </p>
                  <p className="text-sm text-indigo-700 mb-1">
                    <span className="font-semibold">Price:</span> ${order.price} per 1 {order.unit}
                  </p>
                  <p className="text-sm text-indigo-700 mb-3">
                    <span className="font-semibold">Volume:</span> {order.volume} {order.unit}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => navigate(`/order/${order.order_id}/edit`)}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2 rounded-xl text-sm font-medium transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => await deleteOrder(order.order_id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 rounded-xl text-sm font-medium transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {otherOrders.length > 0 && (
          <div className="bg-white/80 rounded-3xl shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Other Orders</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherOrders.map(order => (
                <div
                  key={order.order_id}
                  className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transform transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{order.product?.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Type:</span> {order.order_type?.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Price:</span> ${order.price} per 1 {order.unit}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Volume:</span> {order.volume} {order.unit}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-medium">User:</span> {order.user?.name} ({order.user?.email})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersList
