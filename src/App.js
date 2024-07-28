import "./App.css";
import GetTrain from "./components/getTrain";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ShowTrainList from "./components/showTrainList";
import Header from "./components/Header";
import { useState } from "react";
import LoginComponent from "./components/LoginComponent";
import GetBookingDetails from "./components/GetBookingDetails";
import AddTrain from "./components/AddTrain";
// import { Route, Router, Routes } from "react-router-dom";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className={`App relative `}>
      <Header onclick={() => setOpenModal(true)} />
      <Routes>
        <Route path="/" element={<GetTrain />} />
        <Route path="/bookings/trainlist" element={<ShowTrainList />} />
        <Route path="/bookings/details" element={<GetBookingDetails />} />
        <Route path="/train/add" element={<AddTrain />} />
      </Routes>
      {open && (
        <div className="  z-50 absolute top-1/2 transform -translate-x-1/2 left-1/2 -translate-y-1/2 bg-opacity-20 ">
          <LoginComponent onclick={() => setOpen(false)} />
        </div>
      )}
      {openModal && (
        <ul className=" flex flex-col gap-3 border absolute top-10 bg-gray-300 right-1 p-2">
          <li
            onClick={() => {
              setOpen(true);
              setOpenModal(false);
            }}
            className=" cursor-pointer"
          >
            User
          </li>
          <li
            onClick={() => {
              setOpenModal(false);
            }}
            className=" cursor-pointer"
          >
            <Link to={"/bookings/details"}>Find Booking details</Link>
          </li>
          {/* <li
            onClick={() => {
              setOpenModal(false);
            }}
            className=" cursor-pointer"
          >
            <Link to="/bookings/trainlist">Book Ticket</Link>
          </li> */}
          <li
            onClick={() => {
              setOpenModal(false);
            }}
            className=" cursor-pointer"
          >
            <Link to="/train/add">Add train</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default App;
