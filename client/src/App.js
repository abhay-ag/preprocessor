import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import Register from "./components/Register";

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  // eslint-disable-next-line
  const [reg, setReg] = useState(false);
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
        setReg(true);
      }
    }
    checkReg();
    //  eslint-disable-next-line
  }, [user]);
  return (
    <div>
      <Navbar />
      {!user && <Login />}
      {user && !reg && <Register />}
    </div>
  );
}

export default App;
