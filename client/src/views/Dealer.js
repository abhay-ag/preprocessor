import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Dealer() {
  //  eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [cropName, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [amount, setAmt] = useState(0);
  async function handleSubmit(e) {
    e.preventDefault();
    setShow1(!show1);

    const resp1 = await fetch("http://localhost:8080/api/sell", {
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

    if (qty > data1.limit) {
      alert("You can only sell upto " + data1.limit + "kg of produce");
    } else {
      const resp2 = await fetch("http://localhost:8080/api/add/bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user,
          quan: qty,
          amt: amount,
          crop: cropName.toLowerCase(),
        }),
      });
      const data2 = await resp2.json();
      console.log(data2);
    }

    setName("");
    setQty(0);
  }
  async function handleSubmitTwo(e) {
    e.preventDefault();
    setShow2(!show2);
    const resp1 = await fetch("http://localhost:8080/api/sell", {
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
    if (qty > data1.qty) {
      alert("You can only sell upto " + data1.qty + "kg of produce");
    } else {
      const resp2 = await fetch("http://localhost:8080/api/seller/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user,
          limit: qty,
        }),
      });
      const data2 = await resp2.json();
      console.log(data2);
    }

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
          <div className="flex flex-row w-full px-8 py-5 items-center justify-around">
            <button
              className="w-96 h-96 rounded-lg bg-white shadow-xl flex flex-col items-center justify-center text-5xl font-thin"
              onClick={() => setShow1(true)}
            >
              Buy Produce
              <AiOutlinePlus className="text-5xl font-thin mt-5" size={50} />
            </button>
            <button
              className="w-96 h-96 rounded-lg bg-white shadow-xl flex flex-col items-center justify-center text-5xl font-thin"
              onClick={() => setShow2(true)}
            >
              Sell Produce
              <AiOutlineMinus className="text-5xl font-thin mt-5" size={50} />
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
            <div className="w-full flex flex-row">
              <font className="text-3xl">Expected Amount (per tonne): </font>
              <input
                className="flex-1 px-4 py-2 border-b ml-5 border-black outline-none"
                type="number"
                value={amount}
                onChange={(e) => setAmt(e.target.value)}
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
      {show2 && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.15)] backdrop-blur-lg flex flex-col items-center justify-center">
          <button
            className="absolute right-16 top-16 p-4 rounded-full bg-white flex"
            onClick={() => setShow2(!show2)}
          >
            <AiOutlineClose className="text-5xl font-thin" size={50} />
          </button>
          <form
            className="w-3/4 h-fit bg-white px-8 py-4 rounded-xl space-y-5 flex flex-col"
            onSubmit={handleSubmitTwo}
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
