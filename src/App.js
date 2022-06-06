import { React } from "react";

import "./Styles/styles.css";
import Routes from "./Components/Routes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
