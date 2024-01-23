const Message = ({ user, message, clssName }) => {
  // console.log("dd user",user)
  if (user) {
    return (
      <div className={`message ${clssName}`}>{`${user} : ${message}`}</div>
    );
  } else {
    // <div className={`message ${clssName}`}>{`you : ${message}`}</div>;
    <div className={`message ${clssName}`}>{message}</div>;
  }
};

export default Message;
