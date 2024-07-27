import React from "react";
import { useLocation } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";

const ShowTrainList = () => {
  const location = useLocation();
  const { trainData, fromStation, toStation } = location.state || {};
  return (
    <div className="">
      <h1>Train List</h1>

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
              <button className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white">
                Book Now
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ShowTrainList;
