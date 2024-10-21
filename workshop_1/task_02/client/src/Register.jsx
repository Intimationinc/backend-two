import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./socket";

const Register = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.username.value;
    socket.emit("register", name);
    form.reset();
    navigate("/chat", { state: { name } });
  };

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected", socket.id);
  //   });

  //   return () => {
  //     socket.off();
  //   };
  // }, [socket]);

  return (
    <div className="flex justify-center mt-10">
      <div className="border rounded-md p-4 w-[450px]">
        <h3 className="text-2xl font-bold text-center mb-5 text-gray-600">
          Happy websocket !!!
        </h3>
        <form onSubmit={handleRegister}>
          <div>
            <p className="text-lg font-medium">Input you name</p>
            <input
              type="text"
              className="py-1.5 px-3 border w-full mt-2 rounded-md"
              name="username"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="py-2 px-3 rounded-md bg-blue-800 text-white font-medium"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
