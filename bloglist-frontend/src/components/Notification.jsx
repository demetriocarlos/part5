const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid",
    borderRadius: "5px",
    color: type === "error" ? "red" : "green",
    backgroundColor: type === "error" ? "#fdd" : "#dfd",
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
