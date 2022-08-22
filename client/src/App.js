import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import Register from "./components/Register";

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  return (
    <div>
      <Navbar />
      {!user && <Login />}
      {user && <Register />}
    </div>
  );
}

export default App;
