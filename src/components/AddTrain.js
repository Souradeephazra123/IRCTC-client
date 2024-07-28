import axios from "axios";
import React, { useEffect, useState } from "react";

const AddTrain = () => {
  const initialState = {
    user_id: "",
    train_name: "",
    source: "",
    destination: "",
    seat_capacity: "",
    arrival_time_at_source: "",
    arrival_time_at_destination: "",
  };
  const [input, setInput] = useState({
    user_id: "",
    train_name: "",
    source: "",
    destination: "",
    seat_capacity: "",
    arrival_time_at_source: "",
    arrival_time_at_destination: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      setInput((prevInput) => ({ ...prevInput, user_id: id }));
    } else {
      console.error("User ID not found in local storage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const addTrain = async () => {
    const data = {
      user_id: input.user_id,
      train_name: input.train_name,
      source: input.source,
      destination: input.destination,
      seat_capacity: input.seat_capacity,
      arrival_time_at_source: input.arrival_time_at_source,
      arrival_time_at_destination: input.arrival_time_at_destination,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_KEY}/api/trains/create`,
        data
      );

      if (response.status !== 200) {
        throw new Error("Response is not correct");
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTrain();
    setInput(initialState);
  };
  return (
    <div className=" background-image h-[100vh]  flex items-center px-12">
      <div className=" bg-white p-6 border flex flex-col gap-5">
        <p className=" text-3xl text-primary  font-bold">Add Train</p>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-5 ">
          <div className=" flex gap-5">
            <input
              type="text"
              placeholder="Train name"
              name="train_name"
              autoComplete="on"
              // onChange={(e) => setInput.train_name(e.target.value)}
              onChange={handleChange}
              value={input.train_name}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
            <input
              type="text"
              placeholder="source"
              name="source"
              autoComplete="on"
              // onChange={(e) => setInput.source(e.target.value)}
              onChange={handleChange}
              value={input.source}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
          </div>
          <div className=" flex gap-5">
            <input
              type="text"
              placeholder="destination"
              name="destination"
              autoComplete="on"
              // onChange={(e) => setInput.destination(e.target.value)}
              onChange={handleChange}
              value={input.destination}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
            <input
              type="text"
              placeholder="seat_capacity"
              name="seat_capacity"
              autoComplete="on"
              // onChange={(e) => setInput.seat_capacity(e.target.value)}
              onChange={handleChange}
              value={input.seat_capacity}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
          </div>

          <div className=" flex gap-5">
            <input
              type="text"
              placeholder="arrival_time_at_source"
              name="arrival_time_at_source"
              autoComplete="on"
              // onChange={(e) => setInput.arrival_time_at_source(e.target.value)}
              onChange={handleChange}
              value={input.arrival_time_at_source}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
            <input
              type="text"
              placeholder="arrival_time_at_destination"
              name="arrival_time_at_destination"
              autoComplete="on"
              // onChange={(e) =>
              //   setInput.arrival_time_at_destination(e.target.value)
              // }
              onChange={handleChange}
              value={input.arrival_time_at_destination}
              className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
            />
          </div>

          <button
            type="submit"
            className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrain;
