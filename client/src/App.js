import React from "react";
import Navbar from "./components/Navbar";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div>
      <Navbar />
      {user && <div>{user} Logged in</div>}
    </div>
  );
}

export default App;
