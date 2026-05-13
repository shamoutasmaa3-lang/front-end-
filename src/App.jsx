
import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import Categories from "./Categories";
import Profile from "./Profile";
import Cart from "./Cart";
import Safe from "./Safe";
import NoSafe from "./NoSafe";
import Prescription from "./Prescription";
import SignUp from "./Singup";
import Inventory from "./Inventory";
import PharmacistChat from "./PharmacistChat";
import Notification from "./Notification";
import Digitalpresciption from "./digitalpresciption";

import RoleRoute from "./RoleRoute";
import DoctorHome from "./DoctorHome";
import PharmacistHome from "./PharmacistHome";
import MyOrders from "./MyOrders";

export default function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

     
      <Route
        path="/home"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <Home />
          </RoleRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <Categories />
          </RoleRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <Cart />
          </RoleRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <Prescription />
          </RoleRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <MyOrders />
          </RoleRoute>
        }
      />

      <Route
        path="/safe"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <Safe />
          </RoleRoute>
        }
      />

      <Route
        path="/nosafe"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <NoSafe />
          </RoleRoute>
        }
      />

      
      <Route
        path="/profile"
        element={
          <RoleRoute allowedRoles={["patient", "doctor", "pharmacist"]}>
            <Profile />
          </RoleRoute>
        }
      />

      
      <Route
        path="/inventory"
        element={
          <RoleRoute allowedRoles={["pharmacist"]}>
            <Inventory />
          </RoleRoute>
        }
      />

      <Route
        path="/pharmacistChat"
        element={
          <RoleRoute allowedRoles={["pharmacist"]}>
            <PharmacistChat />
          </RoleRoute>
        }
      />

     
      <Route
        path="/notifaction"
        element={
          <RoleRoute allowedRoles={["pharmacist", "doctor", "patient"]}>
            <Notification />
          </RoleRoute>
        }
      />

     
      <Route
        path="/digitalprescription"
        element={
         <RoleRoute allowedRoles={["doctor"]}>
            <Digitalpresciption />
         </RoleRoute>
        }
      />

     
      <Route path="/doctor" element={<DoctorHome />} />
      <Route path="/pharmacist" element={<PharmacistHome />} />
      <Route path="/patient" element={<Home />} />
    </Routes>
  );
}