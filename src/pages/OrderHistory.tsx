import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useGetOrderByUserIdQuery, useDeleteOrderMutation } from "../slices/orderApi";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/ec1.jpg";

const MyOrdersPage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userId = Number(userInfo?._id);
  const { data, isLoading } = useGetOrderByUserIdQuery(userId);
  const [deleteOrder] = useDeleteOrderMutation();
  const navigate = useNavigate();

  if (!userInfo) return <p className="text-center mt-10 text-gray-700">Please login to view orders.</p>;

  const ownerOrders = data?.orders || [];

  return (
    <div
      className="w-full min-h-screen relative bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold mb-6 text-white text-center"> My Orders</h1>

        {isLoading ? (
          <p className="text-gray-200 text-center">Loading orders...</p>
        ) : ownerOrders.length === 0 ? (
          <p className="text-gray-200 text-center">No orders found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ownerOrders.map((order) => (
              <div
                key={order.order_id}
                className="relative bg-blue-200 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-gray-200 hover:shadow-2xl transform transition-transform duration-300"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2">{order.product?.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Type:</span> {order.order_type?.name}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Price:</span> ${order.price}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Volume:</span> {order.volume} {order.unit}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  <span className="font-medium">User:</span> {order.user?.name} ({order.user?.email})
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
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
