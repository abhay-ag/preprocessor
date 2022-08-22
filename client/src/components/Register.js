import React, { useState } from "react";
import { useStateValue } from "../StateProvider";

function Register() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  const [name, setName] = useState("")
  const [dist, setDist] = useState("")
  const [adr, setAdr] = useState("")
  const [phn, setPhn] = useState("")
  const [role, setRole] = React.useState("Farmer");

  async function handleForm(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uid: user,
            name: name,
            dist: dist,
            aadhar: adr,
            phone: phn,
            role: role,
        }),
    });

    const data = await response.json();
    console.log(data);
    if(data.status === "ok"){
      dispatch({
        type: "SET_ROLE",
        role: data.role,
      });
    }

    setAdr("");
    setDist("");
    setName("");
    setPhn("");
    setRole("");
  }
  return (
    // full screen form
    <div className="container m-auto flex flex-col items-center justify-center h-[70vh] md:h-[80vh] my-16">
      <form onSubmit={handleForm} className = " flex flex-col items-center justify-center bg-white px-8 py-2 rounded-xl shadow-xl">
        <div className="flex flex-row justify-center space-x-4 items-center text-3xl w-full font-semibold py-2  border-b-2  md:border-b-0 ">
          <font className = "flex-1 text-right">Name: </font>
          <input required className="flex-1 outline-none px-2 py-1 border-b border-black" type="text" value = {name} onChange = {(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-row justify-center space-x-4 items-center text-3xl w-full font-semibold py-2  border-b-2  md:border-b-0 ">
          <font className = "flex-1 text-right">District: </font>
          <input required className="flex-1 outline-none px-2 py-1 border-b border-black" type="text" value = {dist} onChange = {(e) => setDist(e.target.value)}/>
        </div>
        <div className="flex flex-row justify-left space-x-4 items-center text-3xl w-full font-semibold py-2  border-b-2  md:border-b-0 ">
          <font className = "flex-1 text-right">Aadhar Number: </font>
          <input required className="flex-1 outline-none px-2 py-1 border-b border-black" type="number" value = {adr} onChange = {(e) => setAdr(e.target.value)}/>
        </div>
        <div className="flex flex-row justify-center space-x-4 items-center text-3xl w-full font-semibold py-2  border-b-2  md:border-b-0 ">
          <font className = "flex-1 text-right">Mobile Number: </font>
          <input required className="flex-1 outline-none px-2 py-1 border-b border-black" type="number" value = {phn} onChange = {(e) => setPhn(e.target.value)}/>
        </div>
        <div className="flex flex-row justify-center  space-x-4 items-center text-3xl w-full font-semibold py-2  border-b-2  md:border-b-0 ">
          <font className = "flex-1 text-right">Select Role:</font>
          <select className="flex-[1.6_0_0%] outline-none px-2 py-1 border-b border-black" value={role} onChange = {(e) => setRole(e.target.value)}>
            <option value="Farmer">Farmer</option>
            <option value="State">State Dealer</option>
            <option value="District">District Dealer</option>
            <option value="Dealer">Dealer</option>
          </select>
        </div>
        <button class="p-3 px-6 pt-2 my-5 text-white bg-[#24292f] rounded-full">Submit Details</button>
      </form>
    </div>
  );
}

export default Register;