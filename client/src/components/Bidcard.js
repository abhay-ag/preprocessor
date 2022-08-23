import React, { useState } from "react";
import { useStateValue } from "../StateProvider";

function Bidcard({ _id, qty, amt, status }) {
  // eslint-disable-next-line
  const [{ user, role, bids }, dispatch] = useStateValue();
  const [stat, setStat] = useState("Open");
  async function handleClick(e) {
    const response = await fetch("http://localhost:8080/api/close/bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amt,
        quantity: qty,
        usr: user,
        r: role,
      }),
    });
    const data = await response.json();
    console.log(data);
    setStat(data.status);
  }
  return (
    <div className="w-64 h-96 rounded-lg space-y-5 bg-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">{qty}</h1>
      <h1 className="text-3xl font-thin">Rs. {amt}</h1>
      <button
        className={`${
          stat === "Open" ? "bg-[#00B74A]" : "bg-[#4f4f4f]"
        } rounded-lg text-2xl font-bold text-white px-4 py-1`}
        onClick={handleClick}
      >
        {stat === "Open" ? "Open" : "Closed"}
      </button>
    </div>
  );
}

export default Bidcard;
