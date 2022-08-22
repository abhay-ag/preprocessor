import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { AiOutlinePlus } from "react-icons/ai";
import Popup from "../components/Popup";

function Farmer() {
  const [{ user }, dispatch] = useStateValue();

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container m-auto h-fit my-4 py-4 flex flex-col items-center justify-center">
      <div className="w-3/4 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
        <div className="w-full bg-[#24292f] flex items-center justify-center text-white text-4xl font-bold py-5">
          Hello, {user}
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row w-full justify-center px-8 py-5 items-center">
            <button className="w-96 h-96 rounded-lg bg-white shadow-xl flex flex-col items-center justify-center text-5xl font-thin">
              BUY
              <AiOutlinePlus className="text-5xl font-thin mt-5" size={50} />
            </button>
          </div>
          <div className="flex flex-row w-full justify-center px-8 py-5 items-center">
            <button className="w-96 h-96 rounded-lg bg-white shadow-xl flex flex-col items-center justify-center text-5xl font-thin">
              SELL
              <AiOutlinePlus className="text-5xl font-thin mt-5" size={50} />
            </button>
          </div>
        </div>
      </div>
      <input type="button" value="Click to Open Popup" onClick={togglePopup} />
      {isOpen && (
        <Popup
          content={
            <>
              <div className="justify-center items-center border-solid">
                <input type="text" value="quantity" onClick={togglePopup} />
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default Farmer;
