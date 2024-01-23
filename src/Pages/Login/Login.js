import { useState } from "react";
import { Link } from "react-router-dom";

let user;
const handleSendUserDetails = () => {
  user = document.getElementById("userName").value;
  document.getElementById("userName").value = "";
};
const Login = () => {
  const [userDetails, setUserDetails] = useState("");

  return (
    <div className="login_main_div">
      <div className="login_body">
        <h2>ZN Chat</h2>
        <div className="user_details_div">
          <input
            onChange={(e) => setUserDetails(e.target.value)}
            type="text"
            placeholder="Name"
            id="userName"
          />
          <Link
            onClick={(e) => (!userDetails ? e.preventDefault() : null)}
            to="/chat"
          >
            <button className="sendBtn" onClick={handleSendUserDetails}>
              Enter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
export { user };
