import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import Register from "./components/Register";
import State from "./views/State";

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
      if (data.status === "ok") {
        dispatch({
          type: "SET_ROLE",
          role: data.role,
        });
        dispatch({
          type: "SET_USER",
          user: data.user,
        });
        setReg(false);
      }
    }
    checkReg();
    //  eslint-disable-next-line
  }, [user, role]);
  return (
    <div>
      <Navbar />
      {/* {!user && <Login />}
      {user && reg && <Register />}
      {role} */}
      <State/>
    </div>
  );
}

export default App;