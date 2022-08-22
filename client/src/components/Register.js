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
    <div>
      <form onSubmit={handleForm}>
        <div>
          <font>Name: </font>
          <input type="text" value = {name} onChange = {(e) => setName(e.target.value)}/>
        </div>
        <div>
          <font>District: </font>
          <input type="text" value = {dist} onChange = {(e) => setDist(e.target.value)}/>
        </div>
        <div>
          <font>Aadhar Number: </font>
          <input type="number" value = {adr} onChange = {(e) => setAdr(e.target.value)}/>
        </div>
        <div>
          <font>Mobile Number: </font>
          <input type="number" value = {phn} onChange = {(e) => setPhn(e.target.value)}/>
        </div>
        <div>
          <font>Select Role</font>
          <select value={role} onChange = {(e) => setRole(e.target.value)}>
            <option value="Farmer">Farmer</option>
            <option value="State">State Dealer</option>
            <option value="District">District Dealer</option>
            <option value="Dealer">Dealer</option>
          </select>
        </div>
        <button>Submit Details</button>
      </form>
    </div>
  );
}

export default Register;
