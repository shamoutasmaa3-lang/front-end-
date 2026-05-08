// import { useState } from "react";
// import { User } from "./UserContext";

// export default function UserProvider({ children }) {
//   const [auth, setAuth] = useState(null);
//   const[cart,setCart]=useState([]);

//   return (
//     <User.Provider value={{ auth, setAuth,cart,setCart }}>
//       {children}
//     </User.Provider>
//   );
// }
import { useState } from "react";
import { User } from "./UserContext";
import Cookies from "universal-cookie";

export default function UserProvider({ children }) {
  const cookie = new Cookies();

  const [auth, setAuth] = useState({
    token: cookie.get("token") || null,
    user: null,
  });

  const [cart, setCart] = useState([]);

  return (
    <User.Provider value={{ auth, setAuth, cart, setCart }}>
      {children}
    </User.Provider>
  );
}