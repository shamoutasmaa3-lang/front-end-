import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./style.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="logo">
  <img src={logo} alt="logo" />
</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>

      <Link to="/home" className="item">
        <i className="fas fa-home icon"></i>
        <span>Home</span>
      </Link>

      <Link to="/categories" className="item">
        <i className="fas fa-capsules icon"></i>
        <span>Categories</span>
      </Link>

      <Link to="/cart" className="item">
        <i className="fas fa-shopping-cart icon"></i>
        <span>Cart</span>
      </Link>

      <Link to="/upload" className="item">
  <i className="fas fa-cloud-upload-alt icon"></i>
  <span>Upload</span>
</Link>




      <Link to="/profile" className="item">
        <i className="fas fa-user-circle icon"></i>
        <span>Profile</span>
      </Link>

    </div>
  );
}
