import { useContext, useEffect, useState } from "react";
import { User } from "./Context/UserContext";
import "./categoris.css";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Categories() {
  const { cart, setCart } = useContext(User);

  const [addedItem, setAdded] = useState([]);
  const [medicines, setMedicines] = useState([]);

  
  const [showForm, setShowForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/medicines", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setMedicines(res.data.data || []);
    } catch (err) {
      console.log(err);
      setMedicines([]);
    }
  };

  async function handleAddToCart(item) {
    const cookie = new Cookies();
    const token = cookie.get("token");

    if (!token) return alert("You must login first");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/items",
        {
          medicine_id: item.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const exists = cart.find((p) => p.id === item.id);

      if (exists) {
        setCart(
          cart.map((p) =>
            p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
          )
        );
      } else {
        setCart([...cart, { ...item, qty: 1 }]);
      }

      setAdded((prev) => [...prev, item.id]);
    } catch (err) {
      console.log(err);
      alert("Failed to add to cart");
    }
  }

  
  async function handleAddMedicine() {
    const cookie = new Cookies();
    const token = cookie.get("token");

    if (!token) return alert("Login required");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/medicines",
        newMedicine,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      alert("Medicine added successfully!");

      setShowForm(false);
      setNewMedicine({ name: "", description: "", price: "" });

      fetchMedicines();
    } catch (err) {
      console.log(err);
      alert("Failed to add medicine");
    }
  }

  return (
    <>
      <Header />
      <SideBar />

      <div className="Contener">

       
        <div
          className="product add-product"
          onClick={() => setShowForm(true)}
        >
          <div className="info add-box">
            <div className="plus">+</div>
            <h2>Add Medicine</h2>
            <p>Click to add new medicine</p>
          </div>
        </div>

        
        {showForm && (
          <div className="product">
            <div className="info">
              <h2>Add New Medicine</h2>

              <input
                placeholder="Name"
                value={newMedicine.name}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, name: e.target.value })
                }
              />

              <input
                placeholder="Description"
                value={newMedicine.description}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    description: e.target.value,
                  })
                }
              />

              <input
                placeholder="Price"
                type="number"
                value={newMedicine.price}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, price: e.target.value })
                }
              />

              <button onClick={handleAddMedicine}>Save</button>

              <button
                onClick={() => setShowForm(false)}
                style={{ backgroundColor: "red", marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        
        {medicines.map((item) => (
          <div className="product" key={item.id}>
            <div className="info">
              <h2>{item.name}</h2>

              <p>
                <strong>Uses:</strong>
                <br />
                {(item.description || "").split(",").map((use, i) => (
                  <span key={i}>
                    {use}
                    <br />
                  </span>
                ))}
              </p>

              <p>
                <strong>Price:</strong> {item.price} S.P
              </p>

              <button
                onClick={() => handleAddToCart(item)}
                style={{
                  backgroundColor: addedItem.includes(item.id)
                    ? "green"
                    : "",
                  color: "white",
                }}
              >
                {addedItem.includes(item.id) ? "Added" : "Add to cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
