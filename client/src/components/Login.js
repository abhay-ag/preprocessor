import React, { useState } from "react";
import { useStateValue } from "../StateProvider";

function Login() {
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");

  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  async function handleForm(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        pwd: pwd,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      dispatch({
        type: "SET_USER",
        user: data.user,
      });
    }

    setPwd("");
    setUid("");
  }
  return (
    <div className="container m-auto flex flex-col items-center justify-center h-[70vh] md:h-[80vh] my-16">
      <div className="w-full lg:w-1/2 shadow-lg h-fit md:h-96 py-4 md:py-0 flex flex-col md:rounded-lg overflow-hidden bg-white">
        <h1 className="text-center h-20 flex flex-row justify-center items-center text-3xl w-full font-semibold py-2 md:bg-[#24292f] border-b-2  md:border-b-0 md:text-white">
          Login
        </h1>
        <form
          className="flex flex-col md:h-full md:justify-around items-center px-2 sm:px-16"
          onSubmit={handleForm}
        >
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-around my-2">
            <font className="text-lg sm:text-2xl mr-4 font-medium">
              UniqueID:
            </font>
            <input
              className="bg-[rgba(0,0,0,0.0)] outline-none border-b flex-1 px-4 py-2"
              type={"email"}
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-around my-2">
            <font className="text-lg sm:text-2xl mr-4 font-medium">
              Password:
            </font>
            <input
              className="bg-[rgba(0,0,0,0.0)] outline-none border-b flex-1 px-4 py-2"
              type={"password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>
          <button className="bg-[#00B74A] sm:w-full rounded-lg py-1 px-4 text-white text-lg sm:text-2xl font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;