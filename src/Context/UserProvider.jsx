import { useState } from "react";
import { User } from "./UserContext";

export default function UserProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const[cart,setCart]=useState([]);

  return (
    <User.Provider value={{ auth, setAuth,cart,setCart }}>
      {children}
    </User.Provider>
  );
}