import { useEffect, useState,useRef } from "react";
import "./taskboard.css";
const ChatBox = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
 
  const chatEndRef = useRef(null);
  const API = import.meta.env.VITE_API_URL || "/api";

useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const loadMessages = async () => {
    try {
      const res = await fetch(
        `${API}/api/messages/project/${projectId}`,
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

  useEffect(() => {
    if (projectId) {
      loadMessages();
    }
  }, [projectId]);

  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      await fetch(`${API}/api/messages/project/${projectId}`, {
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
              <div className="upper-portion">
              <p className="chat-username">{msg.sender?.fullname}</p>
              <p className="chat-time">
  {new Date(msg.createdAt).toLocaleTimeString()}
</p>
              </div>
               <p className="chat-content"> {msg.content}</p> 
            </div>
          ))
        )}
          <div ref={chatEndRef}></div>

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
