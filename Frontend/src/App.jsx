import React from "react";
import "./App.css";
import Header from "./component/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ToastContainer 
        position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop
        closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover theme="dark"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
