import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./assets/smart.jpeg";
import "./signup.css";
import { User } from "./Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [address, setAddress] = useState("");

  const [emailError, setEmailError] = useState("");
  const [accept, setAccept] = useState(false);
  const cookie = new Cookies();
  const nav = useNavigate();

  const user = useContext(User);
  console.log(user);
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        addresss: address,
      });
      const token = res.data.token;
      const userDetails = res.data.user;
      cookie.set("Bearer", token);
      user.setAuth({ token, userDetails });
      nav("/home");
    } catch (err) {
      if (err.response.status === 422 || err.response.status === 401) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  return (
    <div className="signup-container">
      <div className="image-sectionsignup">
        <img src={logo} alt="logo" /> </div>
        <div className="forms">
          <h1> Create Account</h1>
          <h3> Sign up to get started</h3>
          <form onSubmit={submit}>
            <input
              type="text"
              id="name"
              placeholder=" Enter your name."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder=" Enter your email."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError && (
              <p className="error">email is already been token</p>
            )}
             <input
              type="text"
              id="address"
              placeholder=" Enter your address."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />{" "}
            {accept && address.length < 12 && (
              <p> address must be more than 12 char </p>
            )}
            <input
              type="password"
              id="password"
              placeholder=" Enter your password."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">password must be more than 8 char</p>
            )}
            <input
              type="password"
              id="passwordcon"
              placeholder=" Confirm your password."
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {passwordConfirmation !== password && accept && (
              <p className="error"> password dose not match</p>
            )}
           
            <div style={{ textAlign: "center"  }}>
              <button type="submit">Register</button>
            </div>
             <div>
            Already have  an account?
            <Link to="/" className="link">
            Log in
            </Link>
          </div>
          </form>
       
      </div>
    </div>
  );
}
