const sendMessage = async (
  message: string,
  username: string,
  contactName: string
) => {
  return await fetch("/api/addMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      contact: contactName,
      message: message,
      received: false,
    }),
  });
};
export default sendMessage;
