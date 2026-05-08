import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./inventory.css";

export default function Inventory() {
  const [total, setTotal] = useState();
  const [lowStock, setLowStock] = useState();
  const [expiring, setExpiring] = useState();
  const [medicines, setMedicines] = useState([]);

  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  useEffect(() => {
    const Inventory = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/pharmacist/inventory", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setTotal(data.total_items);
        setLowStock(data.low_stock_count);
        setExpiring(data.expiring_soon_count);
        setMedicines(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    Inventory();
  }, []);

  return (
    <div className="inventory-container">
      <div className="header">
        <h1>Inventory Management</h1>
        <p>Track stock levels and expiry dates</p>
      </div>

      <div className="stats">
        <div className="stat-box">
          <p>Total Medicines</p>
          <span>{total}</span>
          <p>All medicines in stock</p>
        </div>

        <div className="stat-box low">
          <p>Low Stock</p>
          <span>{lowStock}</span>
          <p>Below Minimum level</p>
        </div>

        <div className="stat-box expiring">
          <p>Expiring Soon</p>
          <span>{expiring}</span>
          <p>within 30 days</p>
        </div>
      </div>

      <table className="med-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((med) => (
            <tr key={med.id}>
              <td>{med.medicine_name}</td>
              <td>{med.category}</td>
              <td>{med.quantity}</td>
              <td>{med.expiration_date}</td>

              <td>
                {med.quantity === 0 ? (
                  <span className="status out">Out Of Stock</span>
                ) : med.is_low_stock ? (
                  <span className="status low">Low Stock</span>
                ) : med.is_expiring_soon ? (
                  <span className="status exp">Expiring Soon</span>
                ) : (
                  <span className="status ok">In Stock</span>
                )}
              </td>

              <td>
                <button className="btn edit">
                  <i className="fa-solid fa-eye-dropper"></i>
                </button>
                <button className="btn delete">
                  <i className="fa-solid fa-calendar-xmark"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}