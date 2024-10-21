import { createContext, useEffect, useMemo, useState } from "react";
import Register from "./register";
import { useSocket } from "./socket";
import { Outlet, useNavigate } from "react-router-dom";

function App() {


  // const handleRoom = (e) => {
  //   e.preventDefault();
  //   socket.emit("join-room", room);
  //   fetch(`http://localhost:5500/public/${room}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message: e.target.room.value }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => "")
  //     .catch((err) => console.log(err));
  //   const form = e.target
  //   form.reset()
  // };



  return (
    <div className=" m-4">
      <Outlet />
    </div>
  );
}

export default App;
