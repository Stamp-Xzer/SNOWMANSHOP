import React, { useState, useEffect } from "react";
import Header from "./Header";
import Snowflakes from "./Snowflake";
import axios from "axios";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7048/api/Orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch orders",
        });
      });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage:
          "url('https://cdn.discordapp.com/attachments/893088061276192790/1219696450984738826/Untitled_image.jpeg?ex=660c3dd6&is=65f9c8d6&hm=f90584bf8b983c2ceb384f3ce47d8ef1314550981f52713d0a286af9d456cb9c&')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <Snowflakes />
      <br /> <br />
      <div className="sm:container mx-auto text-black text-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <h1 className="text-2xl mb-4 font-medium">Order User</h1>
          <table className="table-auto w-full justify-center">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Product ID</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Username</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderID}>
                  <td className="border px-4 py-2">{order.orderID}</td>
                  <td className="border px-4 py-2">{order.orderProductID}</td>
                  <td className="border px-4 py-2">
                    {parseFloat(order.orderPrice).toFixed(2)} ฿
                  </td>
                  <td className="border px-4 py-2">{order.orderStatus}</td>
                  <td className="border px-4 py-2">{order.orderUsername}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
