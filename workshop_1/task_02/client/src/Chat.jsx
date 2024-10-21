import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "./socket";

const Chat = () => {
  const { state } = useLocation();
  const [chatType, setChatType] = useState("private");
  const [chatName, setChatName] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  console.log(messages);
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("receiveMessage", ({ fromUser, toUser, message }) => {
      console.log(fromUser, message);
      setMessages([
        ...messages,
        { sender: fromUser, receiver: toUser, message },
      ]);
    });
  }, [socket, messages, currentChat]);
  const handleRooms = (e) => {
    e.preventDefault();
    const form = e.target;
    const type = form.type.value;
    const name = form.name.value;
    setChatName([...chatName, { type, name }]);
    if (type == "public") {
      socket.emit("join-room", { name, user: state?.name });
    }
  };

  const handleChat = (e) => {
    e.preventDefault();
    console.log(currentChat);
    const form = e.target;
    const message = form.message.value;
    if (currentChat.type == "private") {
      setMessages([
        ...messages,
        { sender: state?.name, receiver: currentChat?.name, message },
      ]);
      // setMessages((previousMsg) => {
      //   return {
      //     ...previousMsg,
      //     [currentChat?.name]: [{ fromUser: state?.name, message }],
      //   };
      // });
    }
    const messageObj = {
      message,
      toUser: currentChat.name,
      fromUser: state?.name,
      type: currentChat.type,
    };
    socket.emit("sendMessage", messageObj);
    console.log(messageObj);
  };
  return (
    <div className="flex max-md:flex-col flex-row gap-3 justify-center items-start">
      <div className="border p-4 rounded-md w-[450px]">
        <div className="text-center mb-4 font-medium text-2xl text-slate-400">
          Hey, I am {state?.name}
        </div>
        <form onSubmit={handleRooms}>
          <div className="flex gap-3 items-center">
            <select
              onChange={(e) => setChatType(e.target.value)}
              name="type"
              id="type"
              className="border p-3 rounded-md flex-auto"
            >
              <option value="private">Private Chat</option>
              <option value="public">Public Chat</option>
            </select>
            <input
              type="text"
              className="p-3 border flex-1 rounded-md"
              name="name"
              placeholder={`Input ${
                chatType == "private" ? "username" : "room name"
              }`}
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-blue-800 font-black text-white text-xl"
            >
              +
            </button>
          </div>
        </form>
        <div className="mt-5 flex flex-col gap-3">
          {chatName.map((item, id) => {
            return (
              <div
                key={id}
                onClick={() => setCurrentChat(item)}
                className="bg-slate-100 rounded-md py-2 px-4 cursor-pointer"
              >
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="italic">({item.type})</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border w-[450px] rounded-md p-4 max-h-[600px]">
        <div className="text-lg font-semibold pb-2 border-b">
          {`> ${currentChat?.name}`}
        </div>
        <div className="h-[300px] overflow-y-scroll flex gap-2 flex-col mt-4">
          {messages.map((item, id) => {
            console.log("itme", item);
            if (
              currentChat?.type == "public"
                ? item.receiver == currentChat?.name
                : (item.sender == currentChat?.name &&
                    item.receiver == state?.name) ||
                  (item.sender == state?.name &&
                    item.receiver == currentChat?.name)
            ) {
              return (
                <div className="p-2 rounded-sm bg-slate-100 h-fit w-fit" key={id}>
                  <h3 className="text-sm italic text-gray-500">
                    {item.sender}
                  </h3>
                  <p>{item.message}</p>
                </div>
              );
            }
          })}
        </div>
        <form onSubmit={handleChat}>
          <textarea
            className="border w-full mt-3 rounded-md p-3"
            name="message"
            id="message"
            rows={2}
            placeholder="write whatever you want..."
          ></textarea>
          <button
            type="submit"
            className="py-2 px-4 rounded-md mt-3 bg-blue-800 text-white font-semibold"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
