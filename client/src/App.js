import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  return (
    <div>
      <Navbar />
      {!user && <Login />}
      {user && <div>{user} Logged in</div>}
    </div>
  );
}

export default App;
