import React from "react";

function Add() {
  const [userId, setUid] = React.useState("");
  const [paswd, setPwd] = React.useState("");
  async function handleForm(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uid: userId,
            pwd: paswd,
        }),
    })
    const data = await response.json();
    console.log(data);
    setPwd("");
    setUid("");
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#24292f] text-white">
      <form
        className="w-3/4 flex flex-col items-center justify-center space-y-5"
        onSubmit={handleForm}
      >
        <div className="flex flex-row w-full items-center">
          <div className="text-4xl text-right">UniqueID: </div>
          <input
            required
            type="email"
            className="flex-1 px-4 py-2 outline-none bg-[rgba(0,0,0,0)] border-b border-white ml-5"
            placeholder="Set Username"
            value={userId}
            onChange={(e) => setUid(e.target.value)}
          />
        </div>
        <div className="flex flex-row w-full items-center">
          <div className="text-4xl text-right">Password: </div>
          <input
            required
            type="text"
            className="flex-1 px-4 py-2 outline-none bg-[rgba(0,0,0,0)] border-b border-white ml-5"
            placeholder="Set Password"
            value={paswd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <button className="bg-[#00B74A] px-4 py-2 rounded-xl text-2xl font-bold">
          Add User
        </button>
      </form>
    </div>
  );
}

export default Add;
