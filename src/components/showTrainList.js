import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ShowTrainList = () => {
  const [isopen, setIsOpen] = useState(false);
  const [seat, setSeat] = useState("");
  const [selectedTrainId, setSelectedTrainId] = useState(null);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [bookedTrainList, setBookedTrainList] = useState([]);

  useEffect(() => {
    const Id = localStorage.getItem("user_id");
    setUserId(Id);
  }, []);

  useEffect(() => {
    const a_token = localStorage.getItem("access_token");
    setToken(a_token);
  }, []);

  const bookTicket = async (id) => {
    const data = {
      user_id: userId,
      no_of_seats: seat,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_KEY}/api/trains/${id}/book`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookedTrainList(response.data);
      toast.success("Sucessfully booked ticket",{
        position:"top-right"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookNowClick = (trainId) => {
    // e.preventDefault();
    setSelectedTrainId(trainId);
    if (trainId) {
      setIsOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    if (!token) {
      alert("Please login or signup at first");
    }
    e.preventDefault();
    await bookTicket(selectedTrainId);
    setIsOpen(false);
    localStorage.setItem("storage", bookedTrainList);
  };

  const location = useLocation();
  const { trainData, fromStation, toStation } = location.state || {};

  return (
    <div className="relative w-full min-h-screen">
      <p className=" whitespace-nowrap flex gap-2 items-center">
        {trainData?.length} Results for
        <span className=" text-lg font-bold capitalize"> {fromStation}</span>
        <TiArrowRightThick
          size={20}
          color="primary"
          className=" flex justify-center items-center"
        />
        <span className=" text-lg font-bold capitalize"> {toStation}</span>
      </p>
      {trainData ? (
        <ul className=" flex flex-col gap-3">
          {trainData.map((train) => (
            <div
              key={train.train_id}
              className=" border-[0.5px] border-gray-500"
            >
              <p>id:- {train.train_id}</p>
              <p>Name:- {train.train_name}</p>
              <p>Available seats:- {train.available_seats}</p>
              <button
                onClick={() => handleBookNowClick(train?.train_id)}
                className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white"
              >
                Book Now
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
      {/* {isopen && (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="number of seats"
              onChange={(e) => setSeat(e.target.value)}
              value={seat}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
            <button type="submit">Book Ticket</button>
          </form>
        </div>
      )} */}
      {isopen && (
        <div className=" absolute top-1/2 transform -translate-x-1/2 left-1/2 -translate-y-1/2 bg-opacity-20">
          <form
            onSubmit={handleSubmit}
            className=" border rounded z-10 bg-gray-400 flex flex-col gap-2 p-5"
          >
            <label>
              Number of Seats:
              <input
                type="number"
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                className="ml-2 p-1 border border-gray-500 rounded"
                min="1"
                required
              />
            </label>
            <button
              type="submit"
              className="ml-4 bg-button py-2 px-5 rounded-md font-semibold text-white"
            >
              Book
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ShowTrainList;
