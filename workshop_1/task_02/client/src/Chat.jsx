const Chat = () => {
  return (
    <div className="">
      <div className="border ">
        <form>
          <select name="type" id="type">
            <option value="">--chat type--</option>
            <option value="public">Private Chat</option>
            <option value="private">Public Chat</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Chat;
