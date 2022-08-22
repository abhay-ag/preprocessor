import React from "react";
import { FiPower } from "react-icons/fi";
import { useStateValue } from "../StateProvider";

function Navbar() {
  const [{user}, dispatch] = useStateValue()
  const handleClick = () => {
    if(user){
      dispatch({
        type: 'SET_USER',
        user: null
      })
    }
  }
  return (
    <>
      <div className="w-full h-16 bg-[#24292f] px-4 flex flex-row items-center sticky top-0 justify-between">
        <font className="font-medium text-white text-3xl tracking-wide">
          GreenOps
        </font>
        {user && <button onClick={handleClick}>
          <FiPower color="white" size={30} />
        </button>}
      </div>
    </>
  );
}

export default Navbar;
