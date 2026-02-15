import { useEffect, useState } from "react";

const ChatBox = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");


  const loadMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:8090/api/messages/project/${projectId}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // 🔹 Load messages when component mounts or projectId changes
  useEffect(() => {
    if (projectId) {
      loadMessages();
    }
  }, [projectId]);

  // 🔹 Send message (POST → then GET)
  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      await fetch(`http://localhost:8090/api/messages/project/${projectId}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    content: content
  }),
});


      setContent("");
      await loadMessages();

    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-box">
      <h4>Chat Box</h4>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="chat-msg">
              <strong>{msg.sender?.fullname}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>

      <input
        className="chat-input"
        placeholder="type message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
    </div>
  );
};

export default ChatBox;
