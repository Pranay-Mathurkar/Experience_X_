import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";

// Ensure socket is managed globally or outside the component, but connected conditionally
const socket = io("http://localhost:3000", { autoConnect: false });

// Helper component for Avatar placeholder
const Avatar = ({ name }) => (
  <div className="w-10 h-10 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold text-lg flex-shrink-0">
    {name ? name.charAt(0).toUpperCase() : "U"}
  </div>
);

// Helper component for Chat Item
const ChatListItem = ({ chat, myId, activeUserId, onSelectChat }) => {
  if (!Array.isArray(chat.members)) return null;

  const otherUser = chat.members.find(
    (m) => String(m?._id) !== String(myId)
  );

  if (!otherUser) return null;

  const isActive = String(otherUser._id) === String(activeUserId);

  return (
    <div
      onClick={() => onSelectChat(otherUser._id)}
      className={`flex items-center gap-3 p-3 border-b border-slate-100 cursor-pointer transition-colors duration-150 ${
        isActive ? "bg-indigo-100/70 font-semibold" : "hover:bg-slate-100"
      }`}
    >
      <Avatar name={otherUser.name} />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-slate-800 truncate">
          {otherUser.name || "Unknown User"}
        </div>
        <div className="text-xs text-slate-500 line-clamp-1">
          {chat.lastMessage?.message || "Start a conversation"}
        </div>
      </div>
    </div>
  );
};


export default function ChatPage() {
  const { userId: routeUserId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [activeUserId, setActiveUserId] = useState(routeUserId || null);
  const [activeUser, setActiveUser] = useState(null);

  const token = localStorage.getItem("token");
  const myId = user?._id || user?.id;

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom effect
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ================= SOCKET CONNECTIONS & JOIN =================
  useEffect(() => {
    if (!myId || !token) return;
    if (!socket.connected) socket.connect();
    socket.emit("join", myId);

    // Cleanup on unmount
    return () => {
      if (socket.connected) {
        // Optional: Disconnect socket when leaving the chat page
        // socket.disconnect(); 
      }
    };
  }, [myId, token]);

  // ================= FETCH CHAT LIST =================
  const fetchChats = useCallback(() => {
    if (!token || !myId) return;

    axios
      .get("http://localhost:3000/api/chat/my-chats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setChats(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Chat load error:", err));
  }, [token, myId]);
  
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // ================= LOAD MESSAGES & ACTIVE USER =================
  useEffect(() => {
    if (!activeUserId || !token) {
      setMessages([]);
      setActiveUser(null);
      return;
    }

    // 1. Fetch messages
    axios
      .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Message load error:", err));

    // 2. Set active user details from the fetched chats list
    const chat = chats.find(
      (c) =>
        Array.isArray(c.members) &&
        c.members.some((m) => String(m?._id) === String(activeUserId))
    );

    if (chat) {
      const other = chat.members.find(
        (m) => String(m?._id) !== String(myId)
      );
      setActiveUser(other || null);
    } else {
        // If chat isn't in the list (e.g., initial direct message attempt), 
        // fetch the user info directly
        axios.get(`http://localhost:3000/api/users/${activeUserId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setActiveUser(res.data.user || null))
        .catch(err => console.error("Active user load error:", err));
    }

    // Update the URL in case the chat was selected internally
    if (routeUserId !== activeUserId) {
        navigate(`/chat/${activeUserId}`, { replace: true });
    }

  }, [activeUserId, chats, token, myId, navigate, routeUserId]);

  // ================= LIVE RECEIVE MESSAGES =================
  useEffect(() => {
    const handleReceiveMessage = (data) => {
        // Only update messages if the incoming message is for the active chat
        const senderId = data.senderId || (data.sender?._id || data.sender);
        
        if (String(senderId) === String(activeUserId) || String(data.receiverId) === String(activeUserId)) {
            setMessages((prev) => [...prev, data]);
        }
        
        // Also refetch the chat list to update the last message preview
        fetchChats();
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [activeUserId, fetchChats]);

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!text.trim() || !activeUserId || !myId) return;
    
    const messageContent = text;
    setText(""); // Clear input immediately

    // Prepare the message object for temporary display (optimistic update)
    const tempMessage = {
        sender: myId,
        message: messageContent,
        createdAt: new Date().toISOString(),
        seen: false,
    };
    setMessages((prev) => [...prev, tempMessage]);
    
    // 1. Send via Socket for real-time delivery
    socket.emit("sendMessage", {
        senderId: myId,
        receiverId: activeUserId,
        message: messageContent,
    });

    // 2. Save to database via HTTP
    try {
        await axios.post(
            "http://localhost:3000/api/chat/send",
            { receiverId: activeUserId, message: messageContent },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        // On success, update the chat list preview
        fetchChats();
    } catch (err) {
        console.error("Send message failed:", err.response?.data || err.message);
        // Optional: Revert optimistic update or show error
    }
  };


  // ================= UTILITY FUNCTIONS =================
  const handleSelectChat = (otherUserId) => {
    if (!otherUserId || String(otherUserId) === String(activeUserId)) return;
    setActiveUserId(otherUserId);
  };

  const formatTime = (time) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleGoToCompany = () => {
    if (activeUser?.company) {
      navigate(`/company/${activeUser.company}`);
    } else {
      alert("This user has not specified a company.");
    }
  };

  // ================= SAFETY CHECK & LOADING =================
  if (!user || !myId) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-400 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  // ================= MAIN UI (PROFESSIONAL CHAT APP) =================
  return (
    <div className="flex h-screen bg-white shadow-xl max-w-7xl mx-auto rounded-xl overflow-hidden my-4">
      
      {/* ------------------- LEFT CHAT LIST (Sidebar) ------------------- */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Conversations 💬
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-sm text-slate-500">
                You haven't started any conversations yet.
              </p>
            </div>
          )}

          {chats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              myId={myId}
              activeUserId={activeUserId}
              onSelectChat={handleSelectChat}
            />
          ))}
        </div>
      </div>

      {/* ------------------- RIGHT CHAT WINDOW ------------------- */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar name={activeUser?.name} />
            <div className="min-w-0">
              <p className="font-bold text-lg text-indigo-700 truncate">
                {activeUser?.name || "Select a Contact"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {activeUser?.email || "Start messaging to connect"}
              </p>
            </div>
          </div>
          
          {/* Navigate to Company Button */}
          {activeUser?.company && (
            <button
              onClick={handleGoToCompany}
              title={`View ${activeUser.company} profile`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 3h.01M17 14h.01" /></svg>
              View Company
            </button>
          )}
        </div>

        {/* Message Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
          {!activeUserId ? (
            <div className="flex h-full items-center justify-center text-center text-slate-500 text-sm">
              <p>← Please select a user from the left panel to view messages.</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const senderId = msg.sender?._id || msg.sender;
              const isMine = String(senderId) === String(myId);

              return (
                <div
                  key={i}
                  className={`my-3 flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md ${isMine ? "ml-10" : "mr-10"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                        isMine
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white text-slate-800 rounded-tl-none border border-slate-200"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <div className={`text-[10px] mt-1 ${isMine ? "text-slate-600 flex justify-end items-center gap-1" : "text-slate-500"}`}>
                      <span>{formatTime(msg.createdAt)}</span>
                      {/* Read Status Icon */}
                      {isMine && (
                        <svg className={`w-3 h-3 ${msg.seen ? 'text-green-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={msg.seen ? "M5 13l4 4L19 7" : "M5 12l5 5L19 7"} />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-slate-200 bg-white shadow-lg">
          <div className="flex gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border border-slate-300 p-3 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={activeUserId ? "Type your message..." : "Select a user to chat"}
              disabled={!activeUserId}
            />
            <button
              onClick={sendMessage}
              disabled={!activeUserId || !text.trim()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}