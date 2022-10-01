const sendMessage = async (
  username: string,
  message: string,
  contactName: string
) => {
  return await fetch("/api/addMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      message: message,
      chatID: contactName,
    }),
  });
};
export default sendMessage;
