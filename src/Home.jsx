import "./home.css";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./Components/Footer";

import panadol from "./assets/panadol.jpeg";
import vitamin from "./assets/vitamin.png";
import cough from "./assets/cough.png";
import cream from "./assets/cream.png";

import medicineCat from "./assets/medicine.jpg";
import healthCat from "./assets/health.jpg";
import careCat from "./assets/care.jpg";
import babyCat from "./assets/baby.jpg";

export default function Home() {
  const [generalRec, setGeneralRec] = useState([]);
  const [usageRec, setUsageRec] = useState([]);
  const [dosageRec, setDosageRec] = useState([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const cookie = new Cookies();
        const token = cookie.get("token");

        const general = await axios.get(
          "http://127.0.0.1:8000/api/recommendations",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const usage = await axios.get(
          "http://127.0.0.1:8000/api/recommendations/usage",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const dosage = await axios.get(
          "http://127.0.0.1:8000/api/recommendations/dosage",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setGeneralRec(general.data || []);
        setUsageRec(usage.data || []);
        setDosageRec(dosage.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecs();
  }, []);

  const markAsRead = async (id) => {
    try {
      const cookie = new Cookies();
      const token = cookie.get("token");

      await axios.post(
        `http://127.0.0.1:8000/api/recommendations/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <SideBar />

      <div className="main">
        <Header />

        
        <h2 className="section-title">Categories</h2>

        <div className="categories">
          <Link to="/categories" className="cat-card">
            <img src={medicineCat} alt="medicine" />
            <p>Medicine</p>
          </Link>

          <Link to="/categories" className="cat-card">
            <img src={healthCat} alt="health" />
            <p>Health & Wellness</p>
          </Link>

          <Link to="/categories" className="cat-card">
            <img src={careCat} alt="care" />
            <p>Personal Care</p>
          </Link>

          <Link to="/categories" className="cat-card">
            <img src={babyCat} alt="baby" />
            <p>Baby Care</p>
          </Link>
        </div>

        
        <h2 className="section-title">Popular Products</h2>

        <div className="products">
          <Link to="/categories" className="product-card">
            <img src={panadol} alt="panadol" />
            <h3>Panadol Tablets</h3>
            <p>See Details</p>
            <button>Add to cart</button>
          </Link>

          <Link to="/categories" className="product-card">
            <img src={vitamin} alt="vitamin" />
            <h3>Vitamin C</h3>
            <p>See Details</p>
            <button>Add to cart</button>
          </Link>

          <Link to="/categories" className="product-card">
            <img src={cough} alt="cough" />
            <h3>Cough Syrup</h3>
            <p>See Details</p>
            <button>Add to cart</button>
          </Link>

          <Link to="/categories" className="product-card">
            <img src={cream} alt="cream" />
            <h3>Moisturizing Cream</h3>
            <p>See Details</p>
            <button>Add to cart</button>
          </Link>
        </div>

       
        <h2 className="section-title">Recommended for you</h2>

        <div className="products">
          {generalRec.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => markAsRead(item.id)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description || "Recommended"}</p>
              <button>Add to cart</button>
            </div>
          ))}
        </div>

        
        <h2 className="section-title">Based on your usage</h2>

        <div className="products">
          {usageRec.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => markAsRead(item.id)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description || "Based on your history"}</p>
              <button>Add to cart</button>
            </div>
          ))}
        </div>

        
        <h2 className="section-title">Medication Schedule</h2>

        <div className="products">
          {dosageRec.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => markAsRead(item.id)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.time || item.description || "Next dose reminder"}</p>
              <button>View Schedule</button>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}