import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "./Context/UserContext";

export default function MyOrders() {
  const { auth } = useContext(User);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const cookie = new Cookies();
    const token = auth?.token || cookie.get("token");

    async function fetchOrders() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/orders",
          {
            headers: {
              Authorization:` Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        setOrders(res.data.data || []);
      } catch (err) {
        console.log(err.response?.data || err);
        setOrders([]);
      }
    }

    fetchOrders();
  }, [auth?.token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2> My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>Order #{order.id}</h3>
            <p>Date: {order.created_at}</p>
            <p>Status: {order.status}</p>

            <hr />

            {order.items?.map((item) => (
              <div key={item.id}>
                <span>{item.name}</span> — 
                <span> Qty: {item.quantity}</span> — 
                <span> {item.price} S.P</span>
              </div>
            ))}

            <h4>Total: {order.total_price} S.P</h4>
          </div>
        ))
      )}
    </div>
  );
}