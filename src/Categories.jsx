import { useContext } from "react";
import { User } from "./Context/UserContext";
import { products } from "./Product";
import "./categoris.css";
 import SideBar from "./Components/SideBar";
 import Header from "./Components/Header";
 import Footer from "./Components/Footer";
export default function Categories() {
  const { cart, setCart } = useContext(User);

  function handleAddToCart(item) {
    const exists = cart.find((p) => p.id === item.id);

    if (!exists) {
      setCart([...cart, item]);
    }
  }

  return (
    <>
      <Header />
      <SideBar /> 

      <div className="Contener">
        {products.map((item) => (
          <div className="product" key={item.id}>
            <img src={item.img} alt={item.name} />

            <div className="info">
              <h2>{item.name}</h2>

              <p>
                <strong>Uses:</strong><br />
                {item.uses.map((u) => (
                  <span key={u}>{u}<br /></span>
                ))}
              </p>

              <p><strong>Price:</strong> {item.price} S.P</p>

              <button onClick={() => handleAddToCart(item)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}