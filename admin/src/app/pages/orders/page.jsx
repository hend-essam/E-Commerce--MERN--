"use client";

import { backendUrl } from "@/app/AuthWrapper";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const statusOptions = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState("");
  const [token, setToken] = useState("");
  const [openOrderId, setOpenOrderId] = useState(null);

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const fetchOrders = async () => {
    try {
      if (!token) {
        toast.error("Missing admin token. Please log in again.");
        return;
      }
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { token },
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message || "Failed to load orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdating(orderId);
      setOpenOrderId(null);
      const res = await axios.put(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? { ...order, status } : order))
        );
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setUpdating("");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") || "";
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const memoizedOrders = useMemo(() => orders, [orders]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-bold text-2xl">ORDERS</h1>
        <button
          onClick={fetchOrders}
          disabled={loading || !token}
          className="bg-[#8b684c] text-white px-4 py-1.5 rounded-full text-sm"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 items-center text-gray-500">
          <div className="w-12 h-12 border-4 border-[#8b684c] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Loading orders...</p>
        </div>
      ) : memoizedOrders.length === 0 ? (
        <div className="text-gray-600 text-lg">No orders available.</div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 text-lg font-semibold border-y border-[#8b684c] py-3">
            <span>Customer</span>
            <span>Total</span>
            <span>Status</span>
            <span>Date</span>
            <span>Items</span>
          </div>

          <div className="flex flex-col divide-y">
            {memoizedOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 py-4"
              >
                <div>
                  <p className="font-semibold">{order.fullName}</p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                </div>

                <div className="text-lg font-medium">${order.amount.toFixed(2)}</div>

                <div className="relative">
                  <button
                    type="button"
                    disabled={updating === order._id}
                    onClick={() =>
                      setOpenOrderId((prev) => (prev === order._id ? null : order._id))
                    }
                    className={`px-4 py-1 rounded-full text-sm capitalize border border-[#8b684c] flex items-center gap-2 ${
                      statusStyles[order.status] || ""
                    } ${updating === order._id ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {updating === order._id ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      <>
                        {order.status}
                        <span className="text-xs">▾</span>
                      </>
                    )}
                  </button>
                  {openOrderId === order._id && (
                    <ul className="absolute z-10 mt-2 w-40 bg-white border border-[#8b684c33] rounded-xl shadow-lg overflow-hidden">
                      {statusOptions.map((statusOption) => (
                        <li
                          key={statusOption}
                          className={`px-4 py-2 text-sm capitalize cursor-pointer hover:bg-[#8b684c0f] ${
                            statusOption === order.status ? "font-semibold" : ""
                          }`}
                          onClick={() => updateStatus(order._id, statusOption)}
                        >
                          {statusOption}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                <div className="flex flex-col gap-2">
                  {order.items.map((item) => (
                    <div key={item.productId} className="text-sm text-gray-700">
                      <span className="font-semibold">{item.name}</span> × {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
