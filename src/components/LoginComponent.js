import axios from "axios";
import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = ({ onclick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const doSignup = async () => {
    const data = {
      username,
      email,
      password,
    };

    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_KEY}/api/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Response is not correct");
      }
      alert("Signup Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  const doSignin = async () => {
    const data = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_KEY}/api/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Response is not correct");
      }
      alert("Login Successfull");
      toast.success("Login Successfull");

      if (
        response.data?.status === "Login successful" &&
        response.data?.access_token
      ) {
        localStorage.setItem("access_token", response.data?.access_token);
        localStorage.setItem("user_id", response.data?.user_id);
      }
      //   const trainData = response.data;
      //   navigate("/bookings/trainlist", {
      //     state: { trainData, fromStation, toStation },
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await doSignin();
    setPassword("");
    setUsername("");
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    await doSignup();
    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="relative z-50 bg-gray-200  flex  justify-center items-center ">
      <div className=" px-10 py-8 flex flex-col gap-3 border">
        {isLogin ? (
          <>
            <p className=" underline-offset-1 text-primary text-2xl capitalize font-medium">
              LOGIN
            </p>
            <form
              onSubmit={handleSubmitLogin}
              className=" flex flex-col gap-5 "
            >
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
              />

              <input
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
              />

              <button
                type="submit"
                className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            <p className=" underline-offset-1 text-primary text-2xl capitalize font-medium">
              Register
            </p>
            <form
              onSubmit={handleSubmitSignup}
              className=" flex flex-col gap-5 "
            >
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
              />
              <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
              />
              <input
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="  border-[0.5px] text-base 2xl:text-xl rounded text-primary border-primary pl-8 py-2 2xl:py-2.5 text-left bg-transparent "
              />

              <button
                type="submit"
                className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white"
              >
                Register
              </button>
            </form>
          </>
        )}

        <button
          type="submit"
          onClick={() => setIsLogin(false)}
          className=" bg-button py-2 px-5 rounded-md  w-fit font-semibold text-white"
        >
          {isLogin ? <span>Register</span> : <span>Login</span>}
        </button>
      </div>
      <FaWindowClose
        color="primary"
        size={25}
        className=" absolute top-2 right-2"
        onClick={onclick}
      />
      <ToastContainer />
    </div>
  );
};

export default LoginComponent;
