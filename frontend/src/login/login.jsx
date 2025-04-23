import "./login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ token, setToken, backendUrl }) {
  const [slide, setslide] = useState("sign-in");
  const navigate = useNavigate();

  const change = (slide) => {
    setslide(slide);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandlar = async (e) => {
    e.preventDefault();
    try {
      if (slide === "sign-up") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else console.log(res.data.message);
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="login">
      <div className="login-part-one">
        <div>
          <div className="border-1"></div>
          <div className="border-2"></div>
        </div>
        <h1>Make your house comfortable</h1>
      </div>
      <div
        className={`login-part-two ${slide === "cancel" ? "sign-in" : slide}`}
      >
        <div
          className={`${
            slide === "sign-in" || slide === "forget-pass" || slide === "cancel"
              ? "sign-in-slide"
              : "sign-up-slide"
          }`}
        >
          <input type="radio" name="form" id="sign-up" defaultChecked={true} />
          <input type="radio" name="form" id="sign-in" />
          <label
            htmlFor="sign-up"
            onClick={() => {
              change("sign-in");
            }}
          >
            Sign in
          </label>
          <label
            htmlFor="sign-in"
            onClick={() => {
              change("sign-up");
            }}
          >
            Sign up
          </label>
          <div className="background"></div>
        </div>
        <div className="container">
          <form className={`${slide === "sign-up" ? "sign-in-form" : ""}`}>
            <input
              type="email"
              placeholder="Email"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => {
                change("forget-pass");
              }}
            >
              forget password?
            </span>
            <input
              type="submit"
              value="Submit"
              onClick={(e) => onSubmitHandlar(e)}
            />
          </form>
          <form className={`${slide === "sign-up" ? "sign-up-form" : ""}`}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Submit"
              onClick={(e) => onSubmitHandlar(e)}
            />
          </form>
        </div>
        <form
          className={`forget-pass-form ${
            slide === "forget-pass" ? "up" : "down"
          }`}
        >
          <div className="forget-pass-container">
            <h4>Reset your password</h4>
            <p>We will send you an email to reset your password.</p>
            <input type="email" placeholder="Email" />
            <input type="submit" value="Submit" />
            <span
              className="cancel"
              onClick={() => {
                change("cancel");
              }}
            >
              Cancel
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
