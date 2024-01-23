import socketIO from "socket.io-client";
import { user } from "../Login/Login";
import { useEffect, useState } from "react";
import Message from "../../component/Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import BrandLogo from "../../assets/brand.png";
import closeIcon from "../../assets/cross.png";
import Video from "../../assets/videos/v2.mp4";

const EndPoint = "http://localhost:4002";

let socket;
const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  // const handleChangeInput = (e) => {
  //   setInputMessage(e.target.value);
  // };
  // console.log("dd messages",messages)
  // console.log("dd id",id)

  useEffect(() => {
    socket = socketIO(EndPoint, { transports: ["websocket"] });
    socket.on("connect", () => {
      setId(socket.id);
      // console.log("react connected");
    });
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      // console.log("welcome", data);
    });

    socket.on("userjoined", (data) => {
      setMessages([...messages, data]);

      // console.log("userjoined", data);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);

      // console.log("leave", data);
    });

    socket.emit("userLogin", { user });
    return () => {
      // socket.disconnect();
      if (socket.readyState === 1) {
        // <-- This is important
        socket.close();
      }
      // socket.emit("disconnect");
      // socket.off();
    };
  }, []);

  const handleClickSendMessage = () => {
    const message = document.getElementById("message").value;
    socket.emit("sendingMessage", { message, id });
    document.getElementById("message").value = "";
  };

  useEffect(() => {
    socket.on("sentMessage", (data) => {
      setMessages([...messages, data]);

      console.log("dd sentMessage", data);
      return () => {
        socket.off();
      };
    });
  }, [messages]);

  return (
    <section className="global_main_section">
      <div className="chat_div">
        <div className="header">
          <div className="header_left">
            <img className="brandLogo" src={BrandLogo} alt="brand logo" />
            <span className="hero_header">ZN Chat</span>
          </div>
          <div className="header_right">
            <span>{user}</span>
            <img src={closeIcon} alt="close" />
          </div>
        </div>

        <ReactScrollToBottom className="message_div">
          {/* <div className="video_div">
            <video controls>
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div> */}
          {messages?.map((item, i) => (
            <Message
              key={i}
              user={item.id === id ? "you" : item.user}
              message={item.message}
              // user={user}
              clssName={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="send_btn_div">
          <input
            type="text"
            placeholder="write message..."
            id="message"
            // onChange={handleChangeInput}
            // value={inputMessage}
          />
          <button onClick={handleClickSendMessage}>Send</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
