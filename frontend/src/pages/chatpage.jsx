// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { io } from "socket.io-client";
// // import { useAuth } from "../contexts/AuthContext";

// // const socket = io("http://localhost:3000");

// // export default function ChatPage() {
// //   const { userId } = useParams();
// //   const { user } = useAuth();

// //   const [chats, setChats] = useState([]);
// //   const [messages, setMessages] = useState([]);
// //   const [text, setText] = useState("");

// //   const token = localStorage.getItem("token");

// //   // ✅ Join socket room
// //   useEffect(() => {
// //     if (user?._id) {
// //       socket.emit("join", user._id);
// //     }
// //   }, [user]);

// //   // ✅ Load my chat list
// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:3000/api/chat/my-chats", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => setChats(res.data));
// //   }, []);

// //   // ✅ Load selected chat messages
// //   useEffect(() => {
// //     if (userId) {
// //       axios
// //         .get(`http://localhost:3000/api/chat/messages/${userId}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         .then((res) => setMessages(res.data));
// //     }
// //   }, [userId]);

// //   // ✅ Receive live messages
// //   useEffect(() => {
// //     socket.on("receiveMessage", (data) => {
// //       setMessages((prev) => [...prev, data]);
// //     });

// //     return () => socket.off("receiveMessage");
// //   }, []);

// //   // ✅ Send message
// //   const sendMessage = async () => {
// //     if (!text.trim()) return;

// //     const messageData = {
// //       senderId: user._id,
// //       receiverId: userId,
// //       message: text,
// //     };

// //     // Live send
// //     socket.emit("sendMessage", messageData);

// //     // Save to DB
// //     await axios.post(
// //       "http://localhost:3000/api/chat/send",
// //       messageData,
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     setMessages((prev) => [...prev, messageData]);
// //     setText("");
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       {/* LEFT: CHAT LIST */}
// //       <div className="w-1/4 border-r p-4">
// //         <h2 className="font-bold mb-3">Chats</h2>
// //         {chats.map((chat) => {
// //           const otherUser = chat.members.find((m) => m._id !== user._id);
// //           return (
// //             <div key={chat._id} className="p-2 border-b">
// //               {otherUser?.name}
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* RIGHT: CHAT WINDOW */}
// //       <div className="w-3/4 flex flex-col">
// //         <div className="flex-1 p-4 overflow-y-auto">
// //           {messages.map((msg, i) => (
// //             <div
// //               key={i}
// //               className={`my-2 ${
// //                 msg.sender === user._id ? "text-right" : "text-left"
// //               }`}
// //             >
// //               <span className="inline-block bg-gray-200 px-3 py-1 rounded">
// //                 {msg.message}
// //               </span>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="flex p-3 border-t">
// //           <input
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             className="flex-1 border p-2 rounded-l"
// //             placeholder="Type a message"
// //           />
// //           <button
// //             onClick={sendMessage}
// //             className="bg-indigo-600 text-white px-5 rounded-r"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { io } from "socket.io-client";
// // import { useAuth } from "../contexts/AuthContext";

// // // create socket instance once
// // const socket = io("http://localhost:3000", { autoConnect: false });

// // export default function ChatPage() {
// //   const { userId: routeUserId } = useParams();   // user from URL (/chat/:userId)
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const [chats, setChats] = useState([]);
// //   const [messages, setMessages] = useState([]);
// //   const [text, setText] = useState("");

// //   // ✅ keep track of which user we are chatting with
// //   const [activeUserId, setActiveUserId] = useState(routeUserId || null);

// //   const token = localStorage.getItem("token");
// //   // ✅ in AuthContext user has 'id', not '_id'
// //   const myId = user?._id || user?.id;

// //   // ---------- SOCKET JOIN ----------
// //   useEffect(() => {
// //     if (!myId || !token) return;

// //     if (!socket.connected) {
// //       socket.connect();
// //     }

// //     socket.emit("join", myId);
// //   }, [myId, token]);

// //   // ---------- LOAD CHAT LIST ----------
// //   useEffect(() => {
// //     if (!token) return;

// //     axios
// //       .get("http://localhost:3000/api/chat/my-chats", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         setChats(res.data);
// //       })
// //       .catch((err) => {
// //         console.error("Error loading chats:", err.response?.data || err.message);
// //       });
// //   }, [token]);

// //   // ---------- LOAD MESSAGES OF ACTIVE CHAT ----------
// //   useEffect(() => {
// //     if (!activeUserId || !token) return;

// //     axios
// //       .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         setMessages(res.data);
// //       })
// //       .catch((err) => {
// //         console.error(
// //           "Error loading messages:",
// //           err.response?.data || err.message
// //         );
// //       });
// //   }, [activeUserId, token]);

// //   // ---------- RECEIVE LIVE MESSAGES ----------
// //   useEffect(() => {
// //     const handler = (data) => {
// //       // data from socket: { senderId, receiverId, message }
// //       if (
// //         (data.senderId === myId && data.receiverId === activeUserId) ||
// //         (data.senderId === activeUserId && data.receiverId === myId)
// //       ) {
// //         setMessages((prev) => [
// //           ...prev,
// //           { sender: data.senderId, receiver: data.receiverId, message: data.message },
// //         ]);
// //       }
// //     };

// //     socket.on("receiveMessage", handler);
// //     return () => socket.off("receiveMessage", handler);
// //   }, [myId, activeUserId]);

// //   // ---------- SEND MESSAGE ----------
// //   const sendMessage = async () => {
// //     if (!text.trim() || !activeUserId || !myId) return;

// //     // 1) realtime via socket
// //     socket.emit("sendMessage", {
// //       senderId: myId,
// //       receiverId: activeUserId,
// //       message: text,
// //     });

// //     // 2) persist to DB (backend uses sender=req.user._id)
// //     try {
// //       const res = await axios.post(
// //         "http://localhost:3000/api/chat/send",
// //         { receiverId: activeUserId, message: text },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       // res.data is newMessage from DB { _id, sender, receiver, message, ... }
// //       setMessages((prev) => [...prev, res.data]);
// //     } catch (err) {
// //       console.error("Send message failed:", err.response?.data || err.message);
// //     }

// //     setText("");
// //   };

// //   // ---------- WHEN USER CLICKS A CHAT ON LEFT ----------
// //   const handleSelectChat = (otherUserId) => {
// //     setActiveUserId(otherUserId);
// //     navigate(`/chat/${otherUserId}`);
// //   };

// //   // helper: get other user from conversation
// //   const getOtherUser = (chat) => {
// //     if (!chat.members || !myId) return null;
// //     return chat.members.find((m) => String(m._id) !== String(myId));
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       {/* LEFT: CHAT LIST */}
// //       <div className="w-1/4 border-r p-4">
// //         <h2 className="font-bold mb-3">Chats</h2>

// //         {chats.length === 0 && (
// //           <p className="text-sm text-slate-500">No conversations yet.</p>
// //         )}

// //         {chats.map((chat) => {
// //           const otherUser = getOtherUser(chat);
// //           if (!otherUser) return null;

// //           const isActive = String(otherUser._id) === String(activeUserId);

// //           return (
// //             <div
// //               key={chat._id}
// //               onClick={() => handleSelectChat(otherUser._id)}
// //               className={`p-2 border-b cursor-pointer text-sm ${
// //                 isActive ? "bg-indigo-50 font-semibold" : "hover:bg-slate-100"
// //               }`}
// //             >
// //               <div>{otherUser.name}</div>
// //               {chat.lastMessage && (
// //                 <div className="text-[11px] text-slate-500 line-clamp-1">
// //                   {chat.lastMessage.message}
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* RIGHT: CHAT WINDOW */}
// //       <div className="w-3/4 flex flex-col">
// //         <div className="flex-1 p-4 overflow-y-auto">
// //           {activeUserId && messages.length === 0 && (
// //             <p className="text-sm text-slate-400">
// //               Start the conversation by sending a message.
// //             </p>
// //           )}

// //           {messages.map((msg) => {
// //             // msg from DB → msg.sender is ObjectId or populated, from socket handler we also map to same shape
// //             const senderId = msg.sender?._id || msg.sender;
// //             const isMine = String(senderId) === String(myId);

// //             return (
// //               <div
// //                 key={msg._id || `${senderId}-${msg.createdAt}-${Math.random()}`}
// //                 className={`my-2 flex ${
// //                   isMine ? "justify-end" : "justify-start"
// //                 }`}
// //               >
// //                 <span className="inline-block bg-gray-200 px-3 py-1 rounded-lg text-sm">
// //                   {msg.message}
// //                 </span>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         <div className="flex p-3 border-t">
// //           <input
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             className="flex-1 border p-2 rounded-l text-sm"
// //             placeholder="Type a message"
// //           />
// //           <button
// //             onClick={sendMessage}
// //             className="bg-indigo-600 text-white px-5 rounded-r text-sm"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }










































// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { io } from "socket.io-client";
// // import { useAuth } from "../contexts/AuthContext";

// // const socket = io("http://localhost:3000", { autoConnect: false });

// // export default function ChatPage() {
// //   const { userId: routeUserId } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const [chats, setChats] = useState([]);
// //   const [messages, setMessages] = useState([]);
// //   const [text, setText] = useState("");
// //   const [activeUserId, setActiveUserId] = useState(routeUserId || null);
// //   const [activeUser, setActiveUser] = useState(null);

// //   const token = localStorage.getItem("token");
// //   const myId = user?._id || user?.id;

// //   // ✅ SOCKET JOIN
// //   useEffect(() => {
// //     if (!myId || !token) return;
// //     if (!socket.connected) socket.connect();
// //     socket.emit("join", myId);
// //   }, [myId, token]);

// //   // ✅ LOAD CHAT LIST
// //   useEffect(() => {
// //     if (!token) return;

// //     axios
// //       .get("http://localhost:3000/api/chat/my-chats", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => setChats(res.data));
// //   }, [token]);

// //   // ✅ LOAD MESSAGES
// //   useEffect(() => {
// //     if (!activeUserId || !token) return;

// //     axios
// //       .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => setMessages(res.data));

// //     const chat = chats.find((c) =>
// //       c.members.some((m) => String(m._id) === String(activeUserId))
// //     );

// //     if (chat) {
// //       const other = chat.members.find((m) => String(m._id) !== String(myId));
// //       setActiveUser(other);
// //     }
// //   }, [activeUserId, chats, token, myId]);

// //   // ✅ LIVE RECEIVE
// //   useEffect(() => {
// //     socket.on("receiveMessage", (data) => {
// //       setMessages((prev) => [...prev, data]);
// //     });

// //     return () => socket.off("receiveMessage");
// //   }, []);

// //   // ✅ SEND MESSAGE
// //   const sendMessage = async () => {
// //     if (!text.trim() || !activeUserId || !myId) return;

// //     const payload = {
// //       senderId: myId,
// //       receiverId: activeUserId,
// //       message: text,
// //       createdAt: new Date(),
// //       seen: false,
// //     };

// //     socket.emit("sendMessage", payload);
// //     setMessages((prev) => [...prev, payload]);

// //     await axios.post(
// //       "http://localhost:3000/api/chat/send",
// //       { receiverId: activeUserId, message: text },
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     setText("");
// //   };

// //   // ✅ SELECT CHAT
// //   const handleSelectChat = (otherUserId) => {
// //     setActiveUserId(otherUserId);
// //     navigate(`/chat/${otherUserId}`);
// //   };

// //   // ✅ FORMAT TIME
// //   const formatTime = (time) => {
// //     return new Date(time).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       {/* LEFT CHAT LIST */}
// //       <div className="w-1/4 border-r p-4">
// //         <h2 className="font-bold mb-3">Chats</h2>

// //         {chats.map((chat) => {
// //           const otherUser = chat.members.find(
// //             (m) => String(m._id) !== String(myId)
// //           );

// //           return (
// //             <div
// //               key={chat._id}
// //               onClick={() => handleSelectChat(otherUser._id)}
// //               className={`p-2 border-b cursor-pointer text-sm ${
// //                 String(otherUser._id) === String(activeUserId)
// //                   ? "bg-indigo-50 font-semibold"
// //                   : "hover:bg-slate-100"
// //               }`}
// //             >
// //               <div>{otherUser.name}</div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* RIGHT CHAT SECTION */}
// //       <div className="w-3/4 flex flex-col">
// //         {/* ✅ USER NAME HEADER */}
// //         <div className="p-3 border-b font-semibold text-indigo-600">
// //           {activeUser?.name || "Select a chat"}
// //         </div>

// //         {/* ✅ CHAT MESSAGES */}
// //         <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
// //           {messages.map((msg, i) => {
// //             const senderId = msg.sender?._id || msg.sender;
// //             const isMine = String(senderId) === String(myId);

// //             return (
// //               <div
// //                 key={i}
// //                 className={`my-2 flex ${
// //                   isMine ? "justify-end" : "justify-start"
// //                 }`}
// //               >
// //                 <div
// //                   className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow ${
// //                     isMine
// //                       ? "bg-indigo-600 text-white"
// //                       : "bg-white text-slate-800"
// //                   }`}
// //                 >
// //                   {msg.message}

// //                   {/* ✅ TIME + SEEN */}
// //                   <div className="text-[10px] mt-1 flex items-center justify-end gap-1 opacity-80">
// //                     <span>{formatTime(msg.createdAt)}</span>
// //                     {isMine && (
// //                       <span>
// //                         {msg.seen ? "✔✔" : "✔"}
// //                       </span>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* INPUT BOX */}
// //         <div className="flex p-3 border-t">
// //           <input
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             className="flex-1 border p-2 rounded-l text-sm"
// //             placeholder="Type a message"
// //           />
// //           <button
// //             onClick={sendMessage}
// //             className="bg-indigo-600 text-white px-5 rounded-r text-sm"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




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
//     if (!token || !myId) return;

//     axios
//       .get("http://localhost:3000/api/chat/my-chats", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setChats(Array.isArray(res.data) ? res.data : []);
//       })
//       .catch((err) => console.error("Chat load error:", err));
//   }, [token, myId]);

//   // ✅ LOAD MESSAGES OF ACTIVE CHAT
//   useEffect(() => {
//     if (!activeUserId || !token) return;

//     axios
//       .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setMessages(Array.isArray(res.data) ? res.data : []);
//       })
//       .catch((err) => console.error("Message load error:", err));

//     const chat = chats.find(
//       (c) =>
//         Array.isArray(c.members) &&
//         c.members.some((m) => String(m?._id) === String(activeUserId))
//     );

//     if (chat) {
//       const other = chat.members.find(
//         (m) => String(m?._id) !== String(myId)
//       );
//       setActiveUser(other || null);
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
//  const sendMessage = async () => {
//   if (!text.trim() || !activeUserId || !myId) return;

//   socket.emit("sendMessage", {
//     senderId: myId,
//     receiverId: activeUserId,
//     message: text,
//   });

//   try {
//     await axios.post(
//       "http://localhost:3000/api/chat/send",
//       { receiverId: activeUserId, message: text },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//   } catch (err) {
//     console.error("Send message failed:", err.response?.data || err.message);
//   }

//   setText("");
// };


//   // ✅ SELECT CHAT
//   const handleSelectChat = (otherUserId) => {
//     if (!otherUserId) return;
//     setActiveUserId(otherUserId);
//     navigate(`/chat/${otherUserId}`);
//   };

//   // ✅ FORMAT TIME
//   const formatTime = (time) => {
//     if (!time) return "";
//     return new Date(time).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // ✅ SAFETY: WAIT FOR USER
//   if (!user || !myId) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading user...
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen">
//       {/* LEFT CHAT LIST */}
//       <div className="w-1/4 border-r p-4">
//         <h2 className="font-bold mb-3">Chats</h2>

//         {chats.length === 0 && (
//           <p className="text-sm text-slate-500">No conversations yet.</p>
//         )}

//         {chats.map((chat) => {
//           if (!Array.isArray(chat.members)) return null;

//           const otherUser = chat.members.find(
//             (m) => String(m?._id) !== String(myId)
//           );

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
//               <div className="text-[11px] text-slate-500 line-clamp-1">
//                 {chat.lastMessage?.message}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* RIGHT CHAT */}
//       <div className="w-3/4 flex flex-col">
//         <div className="p-3 border-b font-semibold text-indigo-600">
//           {activeUser?.name || "Select a chat"}
//         </div>

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
//                   <div className="text-[10px] mt-1 flex justify-end gap-1">
//                     <span>{formatTime(msg.createdAt)}</span>
//                     {isMine && <span>{msg.seen ? "✔✔" : "✔"}</span>}
//                   </div>
//                 </div>
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




import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";

// socket instance
const socket = io("http://localhost:3000", { autoConnect: false });

// Avatar
const Avatar = ({ name }) => (
  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
    {name ? name.charAt(0).toUpperCase() : "U"}
  </div>
);

// Chat list item
const ChatListItem = ({ chat, myId, activeUserId, onSelectChat }) => {
  if (!Array.isArray(chat.members)) return null;

  const otherUser = chat.members.find((m) => String(m?._id) !== String(myId));
  if (!otherUser) return null;

  const isActive = String(otherUser._id) === String(activeUserId);

  return (
    <button
      type="button"
      onClick={() => onSelectChat(otherUser._id)}
      className={`flex w-full items-center gap-3 px-3 md:px-4 py-2.5 border-b border-slate-100 text-left cursor-pointer transition-colors duration-150 ${
        isActive ? "bg-indigo-50 font-semibold" : "hover:bg-slate-100"
      }`}
    >
      <Avatar name={otherUser.name} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-slate-800 truncate">
          {otherUser.name || "Unknown User"}
        </p>
        <p className="text-xs text-slate-500 line-clamp-1">
          {chat.lastMessage?.message || "Start a conversation"}
        </p>
      </div>
    </button>
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

  // resizable sidebar on md+
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const containerRef = useRef(null);
  const isResizingRef = useRef(false);

  const startResize = (e) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResize);
  };

  const handleMouseMove = (e) => {
    if (!isResizingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const minWidth = 220;
    const maxWidth = 420;
    const newWidth = Math.min(
      Math.max(e.clientX - rect.left, minWidth),
      maxWidth
    );
    setSidebarWidth(newWidth);
  };

  const stopResize = () => {
    isResizingRef.current = false;
    document.body.style.cursor = "default";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResize);
  };

  // scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // socket join
  useEffect(() => {
    if (!myId || !token) return;
    if (!socket.connected) socket.connect();
    socket.emit("join", myId);
    return () => {
      // keep socket open for app
    };
  }, [myId, token]);

  // fetch chats
  const fetchChats = useCallback(() => {
    if (!token || !myId) return;

    axios
      .get("http://localhost:3000/api/chat/my-chats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChats(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Chat load error:", err));
  }, [token, myId]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // load messages + active user
  useEffect(() => {
    if (!activeUserId || !token) {
      setMessages([]);
      setActiveUser(null);
      return;
    }

    axios
      .get(`http://localhost:3000/api/chat/messages/${activeUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(Array.isArray(res.data) ? res.data : []))
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
    } else {
      axios
        .get(`http://localhost:3000/api/users/${activeUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setActiveUser(res.data.user || null))
        .catch((err) => console.error("Active user load error:", err));
    }

    if (routeUserId !== activeUserId) {
      navigate(`/chat/${activeUserId}`, { replace: true });
    }
  }, [activeUserId, chats, token, myId, navigate, routeUserId]);

  // live receive
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const senderId = data.senderId || (data.sender?._id || data.sender);
      if (
        String(senderId) === String(activeUserId) ||
        String(data.receiverId) === String(activeUserId)
      ) {
        setMessages((prev) => [...prev, data]);
      }
      fetchChats();
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [activeUserId, fetchChats]);

  // send
  const sendMessage = async () => {
    if (!text.trim() || !activeUserId || !myId) return;

    const messageContent = text;
    setText("");

    const tempMessage = {
      sender: myId,
      message: messageContent,
      createdAt: new Date().toISOString(),
      seen: false,
    };
    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("sendMessage", {
      senderId: myId,
      receiverId: activeUserId,
      message: messageContent,
    });

    try {
      await axios.post(
        "http://localhost:3000/api/chat/send",
        { receiverId: activeUserId, message: messageContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchChats();
    } catch (err) {
      console.error("Send message failed:", err.response?.data || err.message);
    }
  };

  // helpers
  const handleSelectChat = (otherUserId) => {
    if (!otherUserId || String(otherUserId) === String(activeUserId)) return;
    setActiveUserId(otherUserId);
  };

  const formatTime = (time) =>
    time
      ? new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  const handleGoToCompany = () => {
    if (activeUser?.company) {
      navigate(`/company/${activeUser.company}`);
    } else {
      alert("This user has not specified a company.");
    }
  };

  const handleBack = () => {
    if (activeUser?.company) {
      navigate(`/company/${activeUser.company}`);
    } else {
      navigate(-1);
    }
  };

  // loading guard
  if (!user || !myId) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-400 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  // UI
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-100 px-2 md:px-4 py-3">
      <div
        ref={containerRef}
        className="flex h-full max-h-[90vh] w-full max-w-6xl bg-white shadow-xl rounded-xl md:rounded-2xl overflow-hidden"
      >
        {/* LEFT – chat list (resizable on md+) */}
        <div
          className="hidden md:flex flex-col bg-white border-r border-slate-200"
          style={{ width: sidebarWidth }}
        >
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-base md:text-lg font-bold text-slate-800">
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

        {/* DRAGGABLE DIVIDER (md+) */}
        <div
          onMouseDown={startResize}
          className="hidden md:block w-1 bg-slate-200 hover:bg-slate-400 cursor-col-resize transition-colors"
        />

        {/* RIGHT – chat window */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-3 md:px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex md:hidden items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                title="Back"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <Avatar name={activeUser?.name} />
              <div className="min-w-0">
                <p className="font-bold text-sm md:text-lg text-indigo-700 truncate">
                  {activeUser?.name || "Select a Contact"}
                </p>
                <p className="text-[11px] md:text-xs text-slate-500 truncate">
                  {activeUser?.email || "Start messaging to connect"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs md:text-sm font-medium hover:bg-slate-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              {activeUser?.company && (
                <button
                  onClick={handleGoToCompany}
                  title={`View ${activeUser.company} profile`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs md:text-sm font-medium hover:bg-indigo-200 flex-shrink-0"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 3h.01M17 14h.01"
                    />
                  </svg>
                  Company
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 md:px-4 py-3 md:py-4 overflow-y-auto bg-slate-50/50">
            {!activeUserId ? (
              <div className="flex h-full items-center justify-center text-center text-slate-500 text-sm">
                <p>Select a user from the left panel to view messages.</p>
              </div>
            ) : (
              messages.map((msg, i) => {
                const senderId = msg.sender?._id || msg.sender;
                const isMine = String(senderId) === String(myId);

                return (
                  <div
                    key={i}
                    className={`my-2 md:my-3 flex ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] md:max-w-[60%] ${
                        isMine ? "ml-8" : "mr-8"
                      }`}
                    >
                      <div
                        className={`px-3 md:px-4 py-2 rounded-2xl text-xs md:text-sm shadow-md ${
                          isMine
                            ? "bg-indigo-600 text-white rounded-br-none"
                            : "bg-white text-slate-800 rounded-tl-none border border-slate-200"
                        }`}
                      >
                        {msg.message}
                      </div>
                      <div
                        className={`text-[10px] mt-1 ${
                          isMine
                            ? "text-slate-600 flex justify-end items-center gap-1"
                            : "text-slate-500"
                        }`}
                      >
                        <span>{formatTime(msg.createdAt)}</span>
                        {isMine && (
                          <svg
                            className={`w-3 h-3 ${
                              msg.seen ? "text-green-400" : "text-slate-400"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={
                                msg.seen
                                  ? "M5 13l4 4L19 7"
                                  : "M5 12l5 5L19 7"
                              }
                            />
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

          {/* Input */}
          <div className="px-3 md:px-4 py-2 md:py-3 border-t border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="flex gap-2 md:gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 border border-slate-300 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-sm bg-slate-50 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder={
                  activeUserId ? "Type your message..." : "Select a user to chat"
                }
                disabled={!activeUserId}
              />
              <button
                onClick={sendMessage}
                disabled={!activeUserId || !text.trim()}
                className="bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:bg-indigo-300 disabled:hover:translate-y-0 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}