import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Dealer() {
  const [{ user }, dispatch] = useStateValue();
  const [show1, setShow1] = useState(false);
  const [cropName, setName] = useState("");
  const [qty, setQty] = useState(0);
  async function handleSubmit(e) {
    e.preventDefault();
    setShow1(!show1);

    const resp1 = await fetch("http://localhost:8080/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user,
      }),
    });
    const data1 = await resp1.json();

    console.log(data1);
    const resp2 = await fetch("http://localhost:8080/api/produce", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user,
        produce: qty,
        crop: cropName.toLowerCase(),
        dist: data1.user.dist,
        state: "Haryana",
      }),
    });
    const data2 = await resp2.json();

    console.log(data2);

    setName("");
    setQty(0);
  }
  return (
    <>
      <div className="container m-auto h-fit my-4 py-4 flex flex-col items-center justify-center">
        <div className="w-3/4 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden justify-center">
          <div className="w-full bg-[#24292f] flex items-center justify-center text-white text-4xl font-bold py-5">
            Hello, {user}
          </div>
          <div className="flex flex-row w-full justify-center px-8 py-5 items-center">
            <button
              className="w-96 h-96 rounded-lg bg-white shadow-xl flex flex-col items-center justify-center text-5xl font-thin"
              onClick={() => setShow1(true)}
            >
              Add Produce
              <AiOutlinePlus className="text-5xl font-thin mt-5" size={50} />
            </button>
          </div>
        </div>
      </div>
      {show1 && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.15)] backdrop-blur-lg flex flex-col items-center justify-center">
          <button
            className="absolute right-16 top-16 p-4 rounded-full bg-white flex"
            onClick={() => setShow1(!show1)}
          >
            <AiOutlineClose className="text-5xl font-thin" size={50} />
          </button>
          <form
            className="w-3/4 h-fit bg-white px-8 py-4 rounded-xl space-y-5 flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-row">
              <font className="text-3xl">Name of Crop: </font>
              <input
                className="flex-1 px-4 py-2 border-b ml-5 border-black outline-none"
                type="text"
                value={cropName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-row">
              <font className="text-3xl">Quantity: </font>
              <input
                className="flex-1 px-4 py-2 border-b ml-5 border-black outline-none"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className=" bg-[#00B74A] py-2 text-3xl font-bold text-white rounded-xl"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Dealer;
