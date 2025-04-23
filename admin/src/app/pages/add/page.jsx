"use client";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";
import axios from "axios";
import { backendUrl } from "@/app/AuthWrapper";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [category, setCategory] = useState("chair");

  const token = localStorage.getItem("token");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      image && formData.append("image", image);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("category", category);

      const res = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setImage(false);
        setName("");
        setPrice("");
        setCategory("chair");
        setBestseller(false);
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 w-60">
      <label
        htmlFor="image"
        className="bg-[#8b684c2e] flex flex-col gap-1 items-center p-2 rounded-md text-gray-500 min-h-[8px]"
      >
        Upload Image
        {image ? (
          <Image
            src={URL.createObjectURL(image)}
            width={80}
            height={80}
            alt="product image"
          />
        ) : (
          <IoCloudUploadOutline className="h-12 w-12" />
        )}
        <input
          type="file"
          id="image"
          name="image"
          hidden
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Product name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="py-2 px-1 bg-transparent rounded-md"
          style={{
            border: "2px solid rgb(139 104 76 / var(--tw-bg-opacity))",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="price">Product price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          className="py-2 px-1 bg-transparent rounded-md"
          style={{
            border: "2px solid rgb(139 104 76 / var(--tw-bg-opacity))",
          }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category">Product Category</label>
        <select
          name="category"
          id="category"
          required
          className="py-2 px-1 bg-transparent rounded-md"
          style={{
            border: "2px solid rgb(139 104 76 / var(--tw-bg-opacity))",
          }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="chair" className="bg-[#8b684c2e]">
            Chair
          </option>
          <option value="console" className="bg-[#8b684c2e]">
            Console
          </option>
          <option value="work desk" className="bg-[#8b684c2e]">
            Work desk
          </option>
        </select>
      </div>
      <div className="flex gap-2 text-lg ">
        <input
          type="checkbox"
          name="bestseller"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button
        type="submit"
        className="bg-[#8b684c] text-white px-4 py-1.5 rounded-full text-lg"
      >
        Add Product
      </button>
    </form>
  );
};
export default Add;
