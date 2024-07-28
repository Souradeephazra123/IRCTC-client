import React, { useState } from "react";
import axios from "axios";
import { FaLocationArrow } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GetTrain = () => {
  const [fromStation, setFromstation] = useState("");
  const [toStation, setTostation] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  //   const api = `${process.env.REACT_PUBLIC_API_KEY}/api/trains/availability?source=${fromStation}&destination=${toStation}`;
  //   const fetcher = (url) => fetch(url).then((res) => res.json());

  //   const { data, error } = useSWR(api, fetcher, { revalidateOnFocus: false });
  //   if (error) return <div>Failed to load</div>;
  //   if (!data) return <div>Loading...</div>;

  //   console.log("APi key", process.env.REACT_APP_PUBLIC_API_KEY);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PUBLIC_API_KEY}/api/trains/availability`,
        {
          params: {
            source: fromStation,
            destination: toStation,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Response is not correct");
      }
      setData(response.data);
      const trainData = response.data;
      navigate("/bookings/trainlist", {
        state: { trainData, fromStation, toStation },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  return (
    <div className=" background-image h-[100vh]  flex items-center px-12">
      <div className=" bg-white p-6 border flex flex-col gap-5">
        <p className=" text-3xl text-primary  font-bold">BOOK TICKET</p>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-5 ">
          <div className=" relative">
            <input
              type="text"
              autoComplete="on"
              placeholder="from"
              onChange={(e) => setFromstation(e.target.value)}
              value={fromStation}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
            <FaLocationArrow
              color="primary"
              className=" absolute left-2 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <div className=" relative">
            <input
              type="text"
              autoComplete="on"
              placeholder="to"
              onChange={(e) => setTostation(e.target.value)}
              value={toStation}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
            <FaMapMarkerAlt
              color="primary"
              className=" absolute left-2 top-1/2 transform -translate-y-1/2"
            />
          </div>
          {/* <Link href="/bookings/trainlist"> */}
          <button
            type="submit"
            // onClick={}
            className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white"
          >
            Search
          </button>
          {/* </Link> */}
        </form>

      
      </div>
    </div>
  );
};

export default GetTrain;
