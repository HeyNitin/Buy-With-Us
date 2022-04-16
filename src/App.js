import { React } from "react";

import "./Styles/styles.css";
import Routes from "./Components/Routes";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
