import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { LengthProvider } from "./Contexts/LengthContext";
import { ProductProvider } from "./Contexts/ProductContext";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <LengthProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </LengthProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
