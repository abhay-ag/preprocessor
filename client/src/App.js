import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import Register from "./components/Register";
import Farmer from "./views/Farmer";
import Dealer from "./views/Dealer";

function App() {
  // eslint-disable-next-line
  const [{ user, role }, dispatch] = useStateValue();
  // eslint-disable-next-line
  const [reg, setReg] = useState(true);
  useEffect(() => {
    async function checkReg() {
      const response = await fetch("http://localhost:8080/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        dispatch({
          type: "SET_ROLE",
          role: data.user.role,
        });
        dispatch({
          type: "SET_USER",
          user: data.user.uid,
        });
        setReg(false);
      }
      if (role === "Farmer") {
        const resp = await fetch("http://localhost:8080/api/get/bid", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await resp.json();
        dispatch({
          type: "SET_BIDS",
          bids: data.data,
        });
      }
    }
    checkReg();
    //  eslint-disable-next-line
  }, [user, role]);
  return (
    <div>
      <Navbar />
      {!user && <Login />}
      {user && reg && <Register />}
      {role === "Farmer" && <Farmer />}
      {role === "State" && <Dealer />}
    </div>
  );
}

export default App;
