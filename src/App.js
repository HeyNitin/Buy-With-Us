import { React } from "react";

import "./Styles/styles.css";
import Routes from "./Components/Routes";
import Navbar from "./Components/Navbar";
import { Toast } from "./Components/Toast";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toast />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
