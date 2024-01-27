import React, { Suspense } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import MyFooter from "./component/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "./component/SpinnerLoading/SpinnerLoading";
import { StationsContextProvider } from "./context/StationsContext";
import { BikesContextProvider } from "./context/BikesContext";

function App() {
  const Home = React.lazy(() => import("./pages/Home/Home"));
  const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
  const StationsList = React.lazy(() =>
    import("./pages/admin/Station/StationsList")
  );
  const BikesList = React.lazy(() => import("./pages/admin/Bikes/BikesList"));

  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading />}>
        <BrowserRouter>
          <StationsContextProvider>
            <BikesContextProvider>
              <Header />
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/stationsList"
                  element={<StationsList />}
                />
              </Routes>
              <MyFooter />
            </BikesContextProvider>
          </StationsContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
