import axios from "axios";
import { useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "E-mail":
      return { ...state, email: action.payload };
    case "Password":
      return { ...state, password: action.payload };
    case "rememberMe":
      return { ...state, rememberMe: action.payload };
    case "Error":
      return {
        ...state,
        error: true,
        errorMsg: action.payload || "Wrong Credentials",
      };
    case "defaultCredentials":
      return state.defaultCredentials
        ? {
            ...state,
            email: "",
            password: "",
            defaultCredentials: action.payload,
          }
        : {
            ...state,
            email: "adarshbalika@gmail.com",
            password: "adarshbalika",
            defaultCredentials: action.payload,
          };
    default:
      break;
  }
};

const initialValue = {
  email: "",
  password: "",
  rememberMe: false,
  error: false,
  errorMsg: "",
};

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialValue);
  const { token, setToken } = useAuth();
  const Naviagte = useNavigate();
  const location = useLocation();

  (() => token && Naviagte("/"))();

  const loginHandler = async () => {
    if (state.email !== "" && state.password !== "") {
      try {
        const {
          data: { encodedToken },
        } = await axios.post("/api/auth/login", {
          email: state.email,
          password: state.password,
        });
        setToken(encodedToken);
        state.rememberMe &&
          localStorage.setItem("token", JSON.stringify(encodedToken));
        Naviagte(location?.state?.from?.pathname || "/", { replace: true });
      } catch (error) {
        dispatch({ type: "Error" });
      }
    } else {
      dispatch({
        type: "Error",
        payload: "Please Enter both Email and Password",
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="container">
        <p className="heading-sub text-centered">Login</p>
        <label htmlFor="email-address">Email address</label>
        <input
          onChange={(e) =>
            dispatch({ type: "E-mail", payload: e.target.value })
          }
          value={state.email}
          type="text"
          id="email-address"
          placeholder="john@cena.com"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) =>
            dispatch({ type: "Password", payload: e.target.value })
          }
          value={state.password}
          id="password"
          type="password"
          placeholder="********"
        />
        <div>
          <input
            onClick={(e) =>
              dispatch({ type: "rememberMe", payload: e.target.checked })
            }
            value={state.rememberMe}
            id="remember-me"
            type="checkbox"
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div>
          <input
            onClick={(e) =>
              dispatch({
                type: "defaultCredentials",
                payload: e.target.checked,
              })
            }
            value={state.defaultCredentials}
            id="defaultCredentials"
            type="checkbox"
          />
          <label htmlFor="defaultCredentials">Default Credentials</label>
        </div>
        <div className="footer">
          <button className="button" onClick={() => loginHandler()}>
            Login
          </button>
          <button className="button">
            <Link to="/signup" replace={true}>
              New User? Create New Account
            </Link>
          </button>
        </div>
        {state.error && <div style={{ color: "red" }}>{state.errorMsg}</div>}
      </div>
    </div>
  );
};

export default Login;
