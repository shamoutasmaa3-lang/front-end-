
import { useContext, useEffect, useState } from "react";
import { User } from "./Context/UserContext";
import "./categoris.css";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Cookies from "universal-cookie";

export default function Categories() {
  const { cart, setCart } = useContext(User);
  const[addedItem,setAdded]=useState([]);

  const [medicines, setMedicines] = useState([]);
useEffect(() => {
  const cookie = new Cookies();

  fetch("http://127.0.0.1:8000/api/medicines", {
    headers: {
      Authorization: `Bearer ${cookie.get("Bearer")}`,
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("api DATA:", data);

      setMedicines(data.data);
    })
    .catch((err) => {
      console.error(err);
      setMedicines([]);
    });
}, []);

 function handleAddToCart(item) {
  const exists = cart.find((p) => p.id === item.id);

  if (exists) {
    setCart(cart.filter((p) => p.id !== item.id));

    setAdded(addedItem.filter((id) => id !== item.id));
  } else {
    setCart([...cart, item]);
    setAdded([...addedItem, item.id]);
  }
}
  return (
    <>
      <Header />
      <SideBar />

      <div className="Contener">
        {medicines.map((item) => (
          <div className="product" key={item.id}>
            {/* <img src={item.image_url} alt={item.name} /> */}

            <div className="info">
              <h2>{item.name}</h2>

              <p>
                <strong>Uses:</strong><br />
                {item.description && item.description.split(",").map((user) => (
                  <span key={user}>{user}<br /></span>
                ))}
              </p>

              <p><strong>Price:</strong> {item.price} S.P</p>
<button
  onClick={() => handleAddToCart(item)}
  style={{
    backgroundColor: addedItem.includes(item.id) ? "green" : "",

  }}
>
  {addedItem.includes(item.id) ? "Added " : "Add to cart"}
</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}