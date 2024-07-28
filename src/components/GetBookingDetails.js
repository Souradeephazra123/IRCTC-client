import axios from "axios";
import React, { useEffect, useState } from "react";

const GetBookingDetails = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const a_token = localStorage.getItem("access_token");
    setToken(a_token);
  }, []);

  const fetchBookingDetails = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PUBLIC_API_KEY}/api/trains/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Response is not correct");
      }
      setData(response.data);
      console.log(response.data);
      //   const trainData = response.data;
      // navigate("/bookings/trainlist", {
      //   state: { trainData, fromStation, toStation },
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchBookingDetails(input);
  };
  return (
    <div className=" background-image h-[100vh]  flex items-center px-12">
      <div className=" bg-white p-6 border flex flex-col gap-5">
        <p className=" text-3xl text-primary  font-bold">BOOK TICKET</p>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-5 ">
          <div>
            <input
              type="text"
              placeholder="from"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
          </div>

          <button
            type="submit"
            className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white"
          >
            Search
          </button>
        </form>

        {/* {data.map((train) => ( */}
        <div>
          <p>booking id:- {data.booking_id}</p>
          <p>Train_id:- {data.train_id}</p>
          <p>Train name:- {data.train_name}</p>
          <p>User id:- {data.user_id}</p>
          <p>Seat Numbers:- {data.seat_numbers}</p>
          <p>Available seats:- {data.no_of_seats}</p>
          <p>Arrival time:- {data.arrival_time_at_source}</p>
          <p>Departure time:- {data.arrival_time_at_destination}</p>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default GetBookingDetails;
