import "./App.css";
import GetTrain from "./components/getTrain";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowTrainList from "./components/showTrainList";
import Header from "./components/Header";
import { useState } from "react";
import LoginComponent from "./components/LoginComponent";
// import { Route, Router, Routes } from "react-router-dom";

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className={`App relative `}>
      <Header onclick={() => setOpenModal(true)} />
      <Routes>
        <Route path="/" element={<GetTrain />} />
        <Route path="/bookings/trainlist" element={<ShowTrainList />} />
      </Routes>
      {openModal && (
        <div className=" z-50 absolute top-1/2 transform -translate-x-1/2 left-1/2 -translate-y-1/2 bg-opacity-20 ">
          <LoginComponent onclick={() => setOpenModal(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
