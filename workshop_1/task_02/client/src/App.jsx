import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:5500"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState({ type: "", roomName: "" });
  const [socketId, setSocketId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room: room.roomName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className=" m-4">
      <div className="border p-4 rounded-md text-center font-bold text-2xl">
        Happy websocket !!!, {socketId}
      </div>
      <form
        className="border p-4 rounded-md mt-4 bg-slate-100"
        onSubmit={handleSubmit}
      >
        {" "}
        <textarea
          defaultValue={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="please write your message."
          className="p-3 rounded-md w-full"
        />
        <div className="flex gap-2 items-center">
          <input
            placeholder="private room"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            className="border p-3 rounded-md flex-1"
          />
          <button
            className="px-3 py-2.5 bg-blue-800 text-white rounded-md text-xl"
            type="submit"
          >
            send
          </button>
        </div>
      </form>
      <form>
        <div className="flex gap-2 items-center">
          <input
            placeholder="public room"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            className="border p-3 rounded-md flex-1"
          />
          <button
            className="px-3 py-2.5 bg-blue-800 text-white rounded-md text-xl"
            type="submit"
          >
            join
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
