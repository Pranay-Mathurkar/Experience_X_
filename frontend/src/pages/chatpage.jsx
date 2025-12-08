// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { useAuth } from "../contexts/AuthContext";

// const socket = io("http://localhost:3000");

// export default function ChatPage() {
//   const { userId } = useParams();
//   const { user } = useAuth();

//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   const token = localStorage.getItem("token");

//   // ✅ Join socket room
//   useEffect(() => {
//     if (user?._id) {
//       socket.emit("join", user._id);
//     }
//   }, [user]);

//   // ✅ Load my chat list
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/chat/my-chats", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setChats(res.data));
//   }, []);

//   // ✅ Load selected chat messages
//   useEffect(() => {
//     if (userId) {
//       axios
//         .get(`http://localhost:3000/api/chat/messages/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setMessages(res.data));
//     }
//   }, [userId]);

//   // ✅ Receive live messages
//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => socket.off("receiveMessage");
//   }, []);

//   // ✅ Send message
//   const sendMessage = async () => {
//     if (!text.trim()) return;

//     const messageData = {
//       senderId: user._id,
//       receiverId: userId,
//       message: text,
//     };

//     // Live send
//     socket.emit("sendMessage", messageData);

//     // Save to DB
//     await axios.post(
//       "http://localhost:3000/api/chat/send",
//       messageData,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setMessages((prev) => [...prev, messageData]);
//     setText("");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* LEFT: CHAT LIST */}
//       <div className="w-1/4 border-r p-4">
//         <h2 className="font-bold mb-3">Chats</h2>
//         {chats.map((chat) => {
//           const otherUser = chat.members.find((m) => m._id !== user._id);
//           return (
//             <div key={chat._id} className="p-2 border-b">
//               {otherUser?.name}
//             </div>
//           );
//         })}
//       </div>

//       {/* RIGHT: CHAT WINDOW */}
//       <div className="w-3/4 flex flex-col">
//         <div className="flex-1 p-4 overflow-y-auto">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`my-2 ${
//                 msg.sender === user._id ? "text-right" : "text-left"
//               }`}
//             >
//               <span className="inline-block bg-gray-200 px-3 py-1 rounded">
//                 {msg.message}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="flex p-3 border-t">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="flex-1 border p-2 rounded-l"
//             placeholder="Type a message"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-indigo-600 text-white px-5 rounded-r"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { useAuth } from "../contexts/AuthContext";

// // create socket instance once
// const socket = io("http://localhost:3000", { autoConnect: false });

// export default function ChatPage() {
//   const { userId: routeUserId } = useParams();   // user from URL (/chat/:userId)
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   // ✅ keep track of which user we are chatting with
//   const [activeUserId, setActiveUserId] = useState(routeUserId || null);

//   const token = localStorage.getItem("token");
//   // ✅ in AuthContext user has 'id', not '_id'
//   const myId = user?._id || user?.id;

//   // ---------- SOCKET JOIN ----------
//   useEffect(() => {
//     if (!myId || !token) return;

//     if (!socket.connected) {
//       socket.connect();
//     }

//     socket.emit("join", myId);
//   }, [myId, token]);

//   // ---------- LOAD CHAT LIST ----------
//   useEffect(() => {
//     if (!token) return;

//     axios
//       .get("http://localhost:3000/api/chat/my-chats", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setChats(res.data);
//       })
//       .catch((err) => {
//         console.error("Error loading chats:", err.response?.data || err.message);
//       });
//   }, [token]);

//   // ---------- LOAD MESSAGES OF ACTIVE CHAT ----------
//   useEffect(() => {
//     if (!activeUserId || !token) return;

//     axios
//       .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setMessages(res.data);
//       })
//       .catch((err) => {
//         console.error(
//           "Error loading messages:",
//           err.response?.data || err.message
//         );
//       });
//   }, [activeUserId, token]);

//   // ---------- RECEIVE LIVE MESSAGES ----------
//   useEffect(() => {
//     const handler = (data) => {
//       // data from socket: { senderId, receiverId, message }
//       if (
//         (data.senderId === myId && data.receiverId === activeUserId) ||
//         (data.senderId === activeUserId && data.receiverId === myId)
//       ) {
//         setMessages((prev) => [
//           ...prev,
//           { sender: data.senderId, receiver: data.receiverId, message: data.message },
//         ]);
//       }
//     };

//     socket.on("receiveMessage", handler);
//     return () => socket.off("receiveMessage", handler);
//   }, [myId, activeUserId]);

//   // ---------- SEND MESSAGE ----------
//   const sendMessage = async () => {
//     if (!text.trim() || !activeUserId || !myId) return;

//     // 1) realtime via socket
//     socket.emit("sendMessage", {
//       senderId: myId,
//       receiverId: activeUserId,
//       message: text,
//     });

//     // 2) persist to DB (backend uses sender=req.user._id)
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/chat/send",
//         { receiverId: activeUserId, message: text },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // res.data is newMessage from DB { _id, sender, receiver, message, ... }
//       setMessages((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Send message failed:", err.response?.data || err.message);
//     }

//     setText("");
//   };

//   // ---------- WHEN USER CLICKS A CHAT ON LEFT ----------
//   const handleSelectChat = (otherUserId) => {
//     setActiveUserId(otherUserId);
//     navigate(`/chat/${otherUserId}`);
//   };

//   // helper: get other user from conversation
//   const getOtherUser = (chat) => {
//     if (!chat.members || !myId) return null;
//     return chat.members.find((m) => String(m._id) !== String(myId));
//   };

//   return (
//     <div className="flex h-screen">
//       {/* LEFT: CHAT LIST */}
//       <div className="w-1/4 border-r p-4">
//         <h2 className="font-bold mb-3">Chats</h2>

//         {chats.length === 0 && (
//           <p className="text-sm text-slate-500">No conversations yet.</p>
//         )}

//         {chats.map((chat) => {
//           const otherUser = getOtherUser(chat);
//           if (!otherUser) return null;

//           const isActive = String(otherUser._id) === String(activeUserId);

//           return (
//             <div
//               key={chat._id}
//               onClick={() => handleSelectChat(otherUser._id)}
//               className={`p-2 border-b cursor-pointer text-sm ${
//                 isActive ? "bg-indigo-50 font-semibold" : "hover:bg-slate-100"
//               }`}
//             >
//               <div>{otherUser.name}</div>
//               {chat.lastMessage && (
//                 <div className="text-[11px] text-slate-500 line-clamp-1">
//                   {chat.lastMessage.message}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* RIGHT: CHAT WINDOW */}
//       <div className="w-3/4 flex flex-col">
//         <div className="flex-1 p-4 overflow-y-auto">
//           {activeUserId && messages.length === 0 && (
//             <p className="text-sm text-slate-400">
//               Start the conversation by sending a message.
//             </p>
//           )}

//           {messages.map((msg) => {
//             // msg from DB → msg.sender is ObjectId or populated, from socket handler we also map to same shape
//             const senderId = msg.sender?._id || msg.sender;
//             const isMine = String(senderId) === String(myId);

//             return (
//               <div
//                 key={msg._id || `${senderId}-${msg.createdAt}-${Math.random()}`}
//                 className={`my-2 flex ${
//                   isMine ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <span className="inline-block bg-gray-200 px-3 py-1 rounded-lg text-sm">
//                   {msg.message}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex p-3 border-t">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="flex-1 border p-2 rounded-l text-sm"
//             placeholder="Type a message"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-indigo-600 text-white px-5 rounded-r text-sm"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










































// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { useAuth } from "../contexts/AuthContext";

// const socket = io("http://localhost:3000", { autoConnect: false });

// export default function ChatPage() {
//   const { userId: routeUserId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [activeUserId, setActiveUserId] = useState(routeUserId || null);
//   const [activeUser, setActiveUser] = useState(null);

//   const token = localStorage.getItem("token");
//   const myId = user?._id || user?.id;

//   // ✅ SOCKET JOIN
//   useEffect(() => {
//     if (!myId || !token) return;
//     if (!socket.connected) socket.connect();
//     socket.emit("join", myId);
//   }, [myId, token]);

//   // ✅ LOAD CHAT LIST
//   useEffect(() => {
//     if (!token) return;

//     axios
//       .get("http://localhost:3000/api/chat/my-chats", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setChats(res.data));
//   }, [token]);

//   // ✅ LOAD MESSAGES
//   useEffect(() => {
//     if (!activeUserId || !token) return;

//     axios
//       .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setMessages(res.data));

//     const chat = chats.find((c) =>
//       c.members.some((m) => String(m._id) === String(activeUserId))
//     );

//     if (chat) {
//       const other = chat.members.find((m) => String(m._id) !== String(myId));
//       setActiveUser(other);
//     }
//   }, [activeUserId, chats, token, myId]);

//   // ✅ LIVE RECEIVE
//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => socket.off("receiveMessage");
//   }, []);

//   // ✅ SEND MESSAGE
//   const sendMessage = async () => {
//     if (!text.trim() || !activeUserId || !myId) return;

//     const payload = {
//       senderId: myId,
//       receiverId: activeUserId,
//       message: text,
//       createdAt: new Date(),
//       seen: false,
//     };

//     socket.emit("sendMessage", payload);
//     setMessages((prev) => [...prev, payload]);

//     await axios.post(
//       "http://localhost:3000/api/chat/send",
//       { receiverId: activeUserId, message: text },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setText("");
//   };

//   // ✅ SELECT CHAT
//   const handleSelectChat = (otherUserId) => {
//     setActiveUserId(otherUserId);
//     navigate(`/chat/${otherUserId}`);
//   };

//   // ✅ FORMAT TIME
//   const formatTime = (time) => {
//     return new Date(time).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="flex h-screen">
//       {/* LEFT CHAT LIST */}
//       <div className="w-1/4 border-r p-4">
//         <h2 className="font-bold mb-3">Chats</h2>

//         {chats.map((chat) => {
//           const otherUser = chat.members.find(
//             (m) => String(m._id) !== String(myId)
//           );

//           return (
//             <div
//               key={chat._id}
//               onClick={() => handleSelectChat(otherUser._id)}
//               className={`p-2 border-b cursor-pointer text-sm ${
//                 String(otherUser._id) === String(activeUserId)
//                   ? "bg-indigo-50 font-semibold"
//                   : "hover:bg-slate-100"
//               }`}
//             >
//               <div>{otherUser.name}</div>
//             </div>
//           );
//         })}
//       </div>

//       {/* RIGHT CHAT SECTION */}
//       <div className="w-3/4 flex flex-col">
//         {/* ✅ USER NAME HEADER */}
//         <div className="p-3 border-b font-semibold text-indigo-600">
//           {activeUser?.name || "Select a chat"}
//         </div>

//         {/* ✅ CHAT MESSAGES */}
//         <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
//           {messages.map((msg, i) => {
//             const senderId = msg.sender?._id || msg.sender;
//             const isMine = String(senderId) === String(myId);

//             return (
//               <div
//                 key={i}
//                 className={`my-2 flex ${
//                   isMine ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow ${
//                     isMine
//                       ? "bg-indigo-600 text-white"
//                       : "bg-white text-slate-800"
//                   }`}
//                 >
//                   {msg.message}

//                   {/* ✅ TIME + SEEN */}
//                   <div className="text-[10px] mt-1 flex items-center justify-end gap-1 opacity-80">
//                     <span>{formatTime(msg.createdAt)}</span>
//                     {isMine && (
//                       <span>
//                         {msg.seen ? "✔✔" : "✔"}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* INPUT BOX */}
//         <div className="flex p-3 border-t">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="flex-1 border p-2 rounded-l text-sm"
//             placeholder="Type a message"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-indigo-600 text-white px-5 rounded-r text-sm"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";

const socket = io("http://localhost:3000", { autoConnect: false });

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

  // ✅ SOCKET JOIN
  useEffect(() => {
    if (!myId || !token) return;
    if (!socket.connected) socket.connect();
    socket.emit("join", myId);
  }, [myId, token]);

  // ✅ LOAD CHAT LIST
  useEffect(() => {
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

  // ✅ LOAD MESSAGES OF ACTIVE CHAT
  useEffect(() => {
    if (!activeUserId || !token) return;

    axios
      .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Message load error:", err));

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
    }
  }, [activeUserId, chats, token, myId]);

  // ✅ LIVE RECEIVE
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  // ✅ SEND MESSAGE
 const sendMessage = async () => {
  if (!text.trim() || !activeUserId || !myId) return;

  socket.emit("sendMessage", {
    senderId: myId,
    receiverId: activeUserId,
    message: text,
  });

  try {
    await axios.post(
      "http://localhost:3000/api/chat/send",
      { receiverId: activeUserId, message: text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error("Send message failed:", err.response?.data || err.message);
  }

  setText("");
};


  // ✅ SELECT CHAT
  const handleSelectChat = (otherUserId) => {
    if (!otherUserId) return;
    setActiveUserId(otherUserId);
    navigate(`/chat/${otherUserId}`);
  };

  // ✅ FORMAT TIME
  const formatTime = (time) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ SAFETY: WAIT FOR USER
  if (!user || !myId) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading user...
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* LEFT CHAT LIST */}
      <div className="w-1/4 border-r p-4">
        <h2 className="font-bold mb-3">Chats</h2>

        {chats.length === 0 && (
          <p className="text-sm text-slate-500">No conversations yet.</p>
        )}

        {chats.map((chat) => {
          if (!Array.isArray(chat.members)) return null;

          const otherUser = chat.members.find(
            (m) => String(m?._id) !== String(myId)
          );

          if (!otherUser) return null;

          const isActive = String(otherUser._id) === String(activeUserId);

          return (
            <div
              key={chat._id}
              onClick={() => handleSelectChat(otherUser._id)}
              className={`p-2 border-b cursor-pointer text-sm ${
                isActive ? "bg-indigo-50 font-semibold" : "hover:bg-slate-100"
              }`}
            >
              <div>{otherUser.name}</div>
              <div className="text-[11px] text-slate-500 line-clamp-1">
                {chat.lastMessage?.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT CHAT */}
      <div className="w-3/4 flex flex-col">
        <div className="p-3 border-b font-semibold text-indigo-600">
          {activeUser?.name || "Select a chat"}
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
          {messages.map((msg, i) => {
            const senderId = msg.sender?._id || msg.sender;
            const isMine = String(senderId) === String(myId);

            return (
              <div
                key={i}
                className={`my-2 flex ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow ${
                    isMine
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-800"
                  }`}
                >
                  {msg.message}
                  <div className="text-[10px] mt-1 flex justify-end gap-1">
                    <span>{formatTime(msg.createdAt)}</span>
                    {isMine && <span>{msg.seen ? "✔✔" : "✔"}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex p-3 border-t">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border p-2 rounded-l text-sm"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-5 rounded-r text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
