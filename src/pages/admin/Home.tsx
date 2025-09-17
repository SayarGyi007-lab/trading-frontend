import { useState } from "react";
import bgImage from "../../assets/ec1.jpg"; 
import AddProduct from "./AddProduct";
import AllMatchings from "./AllMatching";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState<"addProduct" | "allMatchings">("addProduct");

  return (
    <div
      className="w-full min-h-screen relative bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Dashboard</h1>

        
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              activeTab === "addProduct" ? "bg-blue-600 text-white" : "bg-white/70 text-gray-700"
            }`}
            onClick={() => setActiveTab("addProduct")}
          >
            Add Product
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              activeTab === "allMatchings" ? "bg-blue-600 text-white" : "bg-white/70 text-gray-700"
            }`}
            onClick={() => setActiveTab("allMatchings")}
          >
            All Matchings
          </button>
        </div>

 
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 min-h-[60vh]">
          {activeTab === "addProduct" && <AddProduct />}
          {activeTab === "allMatchings" && <AllMatchings />}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
