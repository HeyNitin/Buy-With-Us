import axios from "axios";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const signupRedcuer = (state, action) => {
  switch (action.type) {
    case "Name":
      return { ...state, Name: action.payload };
    case "Email":
      return { ...state, Email: action.payload };
    case "Password":
      return { ...state, Password: action.payload };
    case "ConfirmPassword":
      return { ...state, ConfirmPassword: action.payload };
    case "rememberMe":
      return { ...state, rememberMe: action.payload };
    case "tnc":
      return { ...state, tnc: action.payload };
    case "Error":
      return {
        ...state,
        Error: true,
        ErrorMsg: action.payload || "Something went wrong",
      };
    case "Success":
      return { ...state, Error: false };

    default:
      return state;
  }
};

const initialValue = {
  Name: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  Error: false,
  ErrorMsg: "",
  rememberMe: false,
  tnc: false,
};
const Signup = () => {
  const [state, dispatch] = useReducer(signupRedcuer, initialValue);
  const { token, setToken } = useAuth();
  const Naviagte = useNavigate();

  (() => token && Naviagte("/"))();

  const singupHandler = async () => {
    if (state.Password !== state.ConfirmPassword) {
      dispatch({ type: "Error", payload: "Passwords don't match" });
    } else if (!state.tnc) {
      dispatch({ type: "Error", payload: "Please tick the checkbox" });
    } else if (
      state.Name !== "" &&
      state.Password !== "" &&
      state.Email !== ""
    ) {
      try {
        const {
          data: { encodedToken },
        } = await axios.post("/api/auth/signup", {
          email: state.Email,
          password: state.Password,
          name: state.Name,
        });
        setToken(encodedToken);
        state.rememberMe &&
          localStorage.setItem("token", JSON.stringify(encodedToken));
        Naviagte("/", { replace: true });
        dispatch({ type: "Success" });
      } catch (error) {
        dispatch({ type: "Error" });
      }
    } else {
      dispatch({ type: "Error", payload: "Please Enter all fields" });
    }
  };

  return (
    <div className="container">
      <p className="heading-sub text-centered">Signup</p>

      <label htmlFor="name">Enter your Name</label>

      <input
        onChange={(e) => dispatch({ type: "Name", payload: e.target.value })}
        value={state.Name}
        type="text"
        id="name"
        placeholder="Enter your Name"
      />
      <label htmlFor="email-address">Email address</label>
      <input
        onChange={(e) => dispatch({ type: "Email", payload: e.target.value })}
        value={state.Email}
        type="text"
        id="email-address"
        placeholder="john@cena.com"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) =>
          dispatch({ type: "Password", payload: e.target.value })
        }
        value={state.Password}
        id="password"
        type="password"
        placeholder="********"
      />
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        onChange={(e) =>
          dispatch({ type: "ConfirmPassword", payload: e.target.value })
        }
        value={state.ConfirmPassword}
        id="confirm-password"
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
          onClick={(e) => dispatch({ type: "tnc", payload: e.target.checked })}
          value={state.tnc}
          id="tnc"
          type="checkbox"
        />
        <label htmlFor="tnc">I accept all terms & conditions</label>
      </div>
      <div className="footer">
        <button onClick={() => singupHandler()} className="button">
          Sign-Up
        </button>

        <button className="button">
          <Link to="/login">Already have an account? Login</Link>
        </button>
        {state.Error && <div style={{ color: "red" }}>{state.ErrorMsg}</div>}
      </div>
    </div>
  );
};

export default Signup;
