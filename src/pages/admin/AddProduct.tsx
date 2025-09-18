import { useState } from "react";
import { useAddProductMutation, useDeleteProductMutation, useGetAllProductsQuery } from "../../slices/productApi";

const AddProduct = () => {
  const { data: products, refetch, isLoading } = useGetAllProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [productName, setProductName] = useState("");

  const handleAddProduct = async () => {
    if (!productName.trim()) return alert("Product name is required");
    try {
      await addProduct({ name: productName }).unwrap();
      setProductName("");
      refetch();
    } catch (error: any) {
      alert(error?.data?.message || "Failed to add product");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
      refetch();
    } catch (error: any) {
      alert(error?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Admin Product Management</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value.toUpperCase())}
          placeholder="Enter product name"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddProduct}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all"
        >
          Add Product
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">Loading products...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <div
              key={product.product_id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-500 text-sm">ID: {product.product_id}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.product_id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium transition-all shadow-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
