import  { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import MyOrdersPage from "../pages/OrderHistory";
import MyMatchingsPage from "../pages/UserMatchHistory";
import bgImage from "../assets/ec1.jpg"; 

const History = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [activeTab, setActiveTab] = useState<"orders" | "matchings">("orders");

  if (!userInfo)
    return <p className="text-center mt-10 text-gray-700">Please login to view history.</p>;

  return (
    <div
      className="w-full min-h-screen relative bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">History</h1>

        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              activeTab === "orders" ? "bg-blue-600 text-white" : "bg-white/70 text-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              activeTab === "matchings" ? "bg-blue-600 text-white" : "bg-white/70 text-gray-700"
            }`}
            onClick={() => setActiveTab("matchings")}
          >
            Matching History
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 min-h-[60vh]">
          {activeTab === "orders" && <MyOrdersPage />}
          {activeTab === "matchings" && <MyMatchingsPage />}
        </div>
      </div>
    </div>
  );
};

export default History;
