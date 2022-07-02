import axios from "axios";
import { useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useToast } from "../Components/Toast";
import { emailValidator } from "../Services/validatorServices";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

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
        errorMsg: action.payload,
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
            email: "Nitin@BuyWithUs.com",
            password: "justfortest",
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
  defaultCredentials: false
};

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialValue);
  const { setToken } = useAuth();
  const { showToast } = useToast();
  const Navigate = useNavigate();
  const location = useLocation();

  useDocumentTitle("Login");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (state.email !== "" && state.password !== "") {
      if (emailValidator(state.email)) {
        try {
          const { data } = await axios.post("/api/auth/login", {
            email: state.email.toLowerCase(),
            password: state.password,
          });

          setToken(data.encodedToken);
          state.rememberMe &&
            localStorage.setItem("token", JSON.stringify(data.encodedToken));
          showToast("success", "You're successfully logged in");
        } catch (error) {
          dispatch({ type: "Error", payload: "Wrong Credentials" });
        }
      } else {
        dispatch({
          type: "Error",
          payload: "Please enter correct Email Address",
        });
      }
    } else {
      dispatch({
        type: "Error",
        payload: "Please enter both Email and Password",
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="container">
        <p className="heading-sub text-centered">Login</p>
        <form onSubmit={(e) => loginHandler(e)}>
          <label htmlFor="email-address">Email address</label>
          <input
            onChange={(e) =>
              dispatch({ type: "E-mail", payload: e.target.value })
            }
            value={state.email}
            type="email"
            id="email-address"
            placeholder="Nitin@BuyWithUs.com"
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
              checked={state.rememberMe}
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
              checked={state.defaultCredentials}
              id="defaultCredentials"
              type="checkbox"
            />
            <label htmlFor="defaultCredentials">Default Credentials</label>
          </div>
          <div className="footer">
            <button className="button">Login</button>
            <p
              onClick={() =>
                Navigate("/signup", {
                  state: {
                    from: { pathname: location?.state?.from?.pathname },
                  },
                })
              }
            >
              New User? Create New Account
            </p>
          </div>
          {state.error && (
            <div style={{ color: "red" }} className="Error-container">
              {state.errorMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
