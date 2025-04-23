"use client";
import { backendUrl } from "@/app/AuthWrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const List = () => {
  const [list, setList] = useState([]);
  const router = useRouter();

  const token = localStorage.getItem("token");

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setList(res.data.products);
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="font-bold text-2xl w-fit">ALL PRODUCTS</h1>
      {list.length === 0 ? (
        <div className="flex flex-col gap-5 p-5">
          <h1 className="font-bold text-gray-500 text-2xl w-fit">
            No Products
          </h1>
          <button
            onClick={() => router.push("/pages/add")}
            className="bg-[#8b684c] text-white px-4 py-1.5 rounded-full text-lg"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          {/* Header Row */}
          <ul
            className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center text-lg font-semibold"
            style={{
              borderTop: "1px solid #8b684c",
              borderBottom: "1px solid #8b684c",
              padding: "10px 0",
            }}
          >
            <li>Image</li>
            <li>Name</li>
            <li>Category</li>
            <li>Price</li>
            <li>Action</li>
          </ul>

          {/* Product List */}
          <div>
            {list.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center py-4 border-b text-lg"
              >
                {/* Image Container - Fixed Solution */}
                <div className="relative w-20 h-24">
                  <Image
                    src={product.image[0]}
                    fill
                    priority
                    alt={`${product.name} image`}
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="truncate">{product.name}</div>
                <div className="capitalize">{product.category}</div>
                <div>${product.price.toFixed(2)}</div>
                <button
                  onClick={() => removeProduct(product._id)}
                  className="bg-red-500 text-white px-3.5 py-2 rounded-md text-lg w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default List;
