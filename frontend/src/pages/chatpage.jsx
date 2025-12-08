import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";

// ==================== CONFIGURABLE CONSTANTS ====================
const CONFIG = {
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || "http://localhost:3000",
  API_BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
  SOCKET_OPTIONS: {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  },
  MESSAGES_PER_PAGE: 50,
  TYPING_INDICATOR_TIMEOUT: 3000,
  RECONNECT_INTERVAL: 5000,
};

// Socket instance - now with better configuration
const socket = io(CONFIG.SOCKET_URL, CONFIG.SOCKET_OPTIONS);

// ==================== HELPER COMPONENTS ====================

/**
 * Flexible Avatar component with multiple size options
 */
const Avatar = ({ 
  name, 
  size = "md", 
  src, 
  className = "", 
  online = false 
}) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const initials = name ? name.charAt(0).toUpperCase() : "U";
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClass} rounded-full object-cover border-2 border-white`}
        />
      ) : (
        <div
          className={`${sizeClass} rounded-full bg-gradient-to-br from-indigo-100 to-indigo-300 text-indigo-800 flex items-center justify-center font-bold border-2 border-white`}
        >
          {initials}
        </div>
      )}
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
};

/**
 * Enhanced Chat List Item with multiple display modes
 */
const ChatListItem = ({ 
  chat, 
  myId, 
  activeUserId, 
  onSelectChat,
  variant = "default",
  showUnreadCount = true,
  showTimestamp = true,
  onContextMenu
}) => {
  if (!Array.isArray(chat.members)) return null;

  const otherUser = chat.members.find(
    (m) => String(m?._id) !== String(myId)
  );

  if (!otherUser) return null;

  const isActive = String(otherUser._id) === String(activeUserId);
  const unreadCount = chat.unreadCount || 0;
  const lastMessageTime = chat.lastMessage?.createdAt;
  
  const variants = {
    default: "p-3 border-b border-slate-100",
    compact: "p-2",
    minimal: "p-1",
  };

  const handleClick = (e) => {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      onContextMenu?.(e, chat);
    } else {
      onSelectChat(otherUser._id, chat);
    }
  };

  return (
    <div
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => handleClick(e)}
      className={`flex items-center gap-3 cursor-pointer transition-all duration-150 hover:bg-slate-50 ${
        isActive ? "bg-indigo-50 border-l-4 border-l-indigo-500" : ""
      } ${variants[variant] || variants.default}`}
    >
      <div className="relative">
        <Avatar 
          name={otherUser.name} 
          size={variant === "compact" ? "sm" : "md"}
          online={otherUser.isOnline}
        />
        {unreadCount > 0 && showUnreadCount && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="font-medium text-slate-800 truncate">
            {otherUser.name || "Unknown User"}
            {otherUser.role && (
              <span className="ml-2 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {otherUser.role}
              </span>
            )}
          </div>
          {showTimestamp && lastMessageTime && (
            <div className="text-xs text-slate-400 whitespace-nowrap ml-2">
              {formatRelativeTime(lastMessageTime)}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm text-slate-600 line-clamp-1">
            {chat.lastMessage?.message || "Start a conversation"}
          </div>
          {chat.typing && (
            <div className="text-xs text-indigo-500 italic">typing...</div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Message Bubble component with multiple types
 */
const MessageBubble = ({ 
  message, 
  isMine, 
  showAvatar = false,
  showTime = true,
  showStatus = true,
  variant = "default"
}) => {
  const variants = {
    default: "max-w-xs md:max-w-md",
    wide: "max-w-lg",
    full: "max-w-full",
  };

  const senderId = message.sender?._id || message.sender;
  
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} items-end gap-2 my-1`}>
      {showAvatar && !isMine && (
        <Avatar name={message.sender?.name} size="xs" />
      )}
      
      <div className={variants[variant] || variants.default}>
        <div
          className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
            isMine
              ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-br-none"
              : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
          } ${message.status === 'error' ? 'border-red-300 bg-red-50' : ''}`}
        >
          {message.message}
          {message.attachments?.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((att, idx) => (
                <a
                  key={idx}
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-black/10 rounded hover:bg-black/20"
                >
                  📎 {att.name}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <div className={`text-[10px] mt-1 flex items-center gap-1 ${
          isMine ? "justify-end" : "justify-start"
        }`}>
          {showTime && (
            <span className={`${isMine ? 'text-slate-500' : 'text-slate-400'}`}>
              {formatTime(message.createdAt)}
            </span>
          )}
          
          {isMine && showStatus && (
            <MessageStatus status={message.status} seen={message.seen} />
          )}
        </div>
      </div>
      
      {showAvatar && isMine && (
        <Avatar name="You" size="xs" />
      )}
    </div>
  );
};

const MessageStatus = ({ status, seen }) => {
  if (status === 'error') {
    return <span className="text-red-400">✗</span>;
  }
  
  if (status === 'sending') {
    return <span className="text-slate-400 animate-pulse">●</span>;
  }
  
  return seen ? (
    <span className="text-green-400">✓✓</span>
  ) : (
    <span className="text-slate-400">✓</span>
  );
};

// ==================== UTILITY FUNCTIONS ====================

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
};

const formatTime = (time) => {
  if (!time) return "";
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ==================== MAIN CHAT COMPONENT ====================

export default function ChatPage() {
  const { userId: routeUserId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // State management
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [activeUserId, setActiveUserId] = useState(routeUserId || null);
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState({
    chats: false,
    messages: false,
    user: false,
  });
  const [typingUsers, setTypingUsers] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    hasMore: true,
    isLoadingMore: false,
  });

  const token = localStorage.getItem("token");
  const myId = user?._id || user?.id;
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // ==================== CUSTOM HOOKS ====================

  // Socket connection management
  useEffect(() => {
    if (!myId || !token) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", myId);

    // Listen for typing indicators
    socket.on("typing", ({ userId, isTyping }) => {
      setTypingUsers(prev => ({
        ...prev,
        [userId]: isTyping,
      }));
    });

    // Listen for online status
    socket.on("userOnline", ({ userId, isOnline }) => {
      setChats(prev => prev.map(chat => ({
        ...chat,
        members: chat.members.map(member => 
          member._id === userId ? { ...member, isOnline } : member
        ),
      })));
    });

    return () => {
      socket.off("typing");
      socket.off("userOnline");
    };
  }, [myId, token]);

  // Fetch chats with pagination and search support
  const fetchChats = useCallback(async (options = {}) => {
    if (!token || !myId) return;

    setLoading(prev => ({ ...prev, chats: true }));
    
    try {
      const params = new URLSearchParams({
        page: options.page || 1,
        limit: options.limit || 20,
        ...(options.search && { search: options.search }),
      });

      const response = await axios.get(
        `${CONFIG.API_BASE_URL}/chat/my-chats?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newChats = Array.isArray(response.data) ? response.data : [];
      
      setChats(prev => 
        options.page > 1 ? [...prev, ...newChats] : newChats
      );

      // Update unread counts
      const counts = {};
      newChats.forEach(chat => {
        const otherUser = chat.members.find(m => String(m._id) !== String(myId));
        if (otherUser && chat.unreadCount) {
          counts[otherUser._id] = chat.unreadCount;
        }
      });
      setUnreadCounts(counts);

    } catch (error) {
      console.error("Chat load error:", error);
    } finally {
      setLoading(prev => ({ ...prev, chats: false }));
    }
  }, [token, myId]);

  // Load more messages on scroll
  const loadMoreMessages = useCallback(async () => {
    if (!activeUserId || !token || !pagination.hasMore || pagination.isLoadingMore) return;

    setPagination(prev => ({ ...prev, isLoadingMore: true }));

    try {
      const response = await axios.get(
        `${CONFIG.API_BASE_URL}/chat/messages/${activeUserId}`,
        {
          params: { page: pagination.page + 1, limit: CONFIG.MESSAGES_PER_PAGE },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newMessages = Array.isArray(response.data) ? response.data : [];
      
      if (newMessages.length > 0) {
        setMessages(prev => [...newMessages, ...prev]);
        setPagination(prev => ({ 
          ...prev, 
          page: prev.page + 1,
          hasMore: newMessages.length === CONFIG.MESSAGES_PER_PAGE,
        }));
      } else {
        setPagination(prev => ({ ...prev, hasMore: false }));
      }
    } catch (error) {
      console.error("Load more messages error:", error);
    } finally {
      setPagination(prev => ({ ...prev, isLoadingMore: false }));
    }
  }, [activeUserId, token, pagination]);

  // Auto-scroll with better behavior detection
  useEffect(() => {
    if (!messagesEndRef.current) return;

    const container = messagesContainerRef.current;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Enhanced message receiving with optimistic updates
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const senderId = data.senderId || (data.sender?._id || data.sender);
      
      // Add message to current chat
      if (String(senderId) === String(activeUserId) || String(data.receiverId) === String(activeUserId)) {
        setMessages(prev => [...prev, { ...data, status: 'delivered' }]);
        
        // Mark as seen if we're viewing the chat
        if (String(senderId) === String(activeUserId)) {
          socket.emit("markAsSeen", { messageId: data._id });
        }
      }
      
      // Update unread count
      if (String(senderId) !== String(myId) && String(senderId) !== String(activeUserId)) {
        setUnreadCounts(prev => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }
      
      // Update chat list
      fetchChats();
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [activeUserId, myId, fetchChats]);

  // ==================== MESSAGE HANDLING ====================

  const sendMessage = async () => {
    if (!text.trim() || !activeUserId || !myId) return;
    
    const messageContent = text.trim();
    setText("");

    // Optimistic update
    const tempMessage = {
      _id: `temp-${Date.now()}`,
      sender: myId,
      message: messageContent,
      createdAt: new Date().toISOString(),
      seen: false,
      status: 'sending',
    };
    
    setMessages(prev => [...prev, tempMessage]);

    // Clear typing indicator
    socket.emit("typing", { 
      receiverId: activeUserId, 
      isTyping: false 
    });

    try {
      // Send via HTTP
      const response = await axios.post(
        `${CONFIG.API_BASE_URL}/chat/send`,
        { receiverId: activeUserId, message: messageContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update with real message from server
      setMessages(prev => prev.map(msg => 
        msg._id === tempMessage._id 
          ? { ...response.data, status: 'sent' }
          : msg
      ));

      // Send via socket
      socket.emit("sendMessage", {
        senderId: myId,
        receiverId: activeUserId,
        message: messageContent,
        messageId: response.data._id,
      });

      fetchChats();

    } catch (error) {
      console.error("Send message failed:", error);
      // Mark as error
      setMessages(prev => prev.map(msg => 
        msg._id === tempMessage._id 
          ? { ...msg, status: 'error' }
          : msg
      ));
    }
  };

  const handleTyping = useCallback(() => {
    if (!activeUserId || !myId) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing start
    socket.emit("typing", { 
      receiverId: activeUserId, 
      isTyping: true 
    });

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { 
        receiverId: activeUserId, 
        isTyping: false 
      });
    }, CONFIG.TYPING_INDICATOR_TIMEOUT);
  }, [activeUserId, myId]);

  // ==================== CHAT MANAGEMENT ====================

  const handleSelectChat = (userId, chat = null) => {
    if (!userId || String(userId) === String(activeUserId)) return;
    
    setActiveUserId(userId);
    
    // Reset pagination for new chat
    setPagination({ page: 1, hasMore: true, isLoadingMore: false });
    
    // Mark as read
    if (unreadCounts[userId]) {
      setUnreadCounts(prev => ({ ...prev, [userId]: 0 }));
    }
    
    // Update URL
    navigate(`/chat/${userId}`, { 
      replace: true,
      state: { from: location.pathname }
    });
  };

  const startNewChat = async (userId) => {
    if (!userId || !token) return;
    
    try {
      // Check if chat already exists
      const existingChat = chats.find(chat => 
        chat.members.some(m => String(m._id) === String(userId))
      );
      
      if (existingChat) {
        handleSelectChat(userId, existingChat);
        return;
      }
      
      // Create new chat
      const response = await axios.post(
        `${CONFIG.API_BASE_URL}/chat/start`,
        { receiverId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Add to chats list and select
      setChats(prev => [response.data, ...prev]);
      handleSelectChat(userId, response.data);
      
    } catch (error) {
      console.error("Start chat failed:", error);
    }
  };

  // ==================== MEMOIZED VALUES ====================

  const totalUnread = useMemo(() => {
    return Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
  }, [unreadCounts]);

  const isTyping = useMemo(() => {
    return typingUsers[activeUserId] || false;
  }, [typingUsers, activeUserId]);

  // ==================== RENDER ====================

  if (!user || !myId) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white max-w-7xl mx-auto">
      
      {/* LEFT PANEL - Chat List */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white transition-all duration-300`}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800">
              Messages {totalUnread > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {totalUnread}
                </span>
              )}
            </h2>
            <button
              onClick={() => startNewChat(prompt("Enter user ID to start chat:"))}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
              title="Start new chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2 pl-10 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => fetchChats({ search: e.target.value })}
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading.chats && chats.length === 0 ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex items-center gap-3 p-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : chats.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-slate-600 mb-2">No conversations yet</p>
              <button
                onClick={() => startNewChat(prompt("Enter user ID to start chat:"))}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Start a new chat
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {chats.map((chat) => (
                <ChatListItem
                  key={chat._id}
                  chat={chat}
                  myId={myId}
                  activeUserId={activeUserId}
                  onSelectChat={handleSelectChat}
                  variant="default"
                />
              ))}
              
              {pagination.hasMore && (
                <button
                  onClick={() => fetchChats({ page: pagination.page + 1 })}
                  className="w-full py-3 text-sm text-indigo-600 hover:bg-slate-50"
                >
                  Load more...
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - Chat Window */}
      <div className="flex-1 flex flex-col">
        {!activeUserId ? (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Welcome to Messages
              </h3>
              <p className="text-slate-600 max-w-sm mx-auto">
                Select a conversation from the left panel or start a new chat to begin messaging.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar 
                  name={activeUser?.name} 
                  src={activeUser?.avatar}
                  online={activeUser?.isOnline}
                />
                <div>
                  <p className="font-bold text-lg text-slate-800">
                    {activeUser?.name || "Loading..."}
                  </p>
                  <div className="flex items-center gap-2">
                    {isTyping ? (
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse delay-100" />
                        <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse delay-200" />
                        <span className="text-xs text-indigo-500">typing...</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {activeUser?.isOnline ? "Online" : "Offline"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {activeUser?.company && (
                  <button
                    onClick={() => navigate(`/company/${activeUser.company}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Company
                  </button>
                )}
                
                <button
                  onClick={() => setActiveUserId(null)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-full md:hidden"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-slate-50"
              onScroll={(e) => {
                if (e.target.scrollTop === 0 && pagination.hasMore) {
                  loadMoreMessages();
                }
              }}
            >
              {pagination.isLoadingMore && (
                <div className="text-center py-4">
                  <div className="inline-block w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                </div>
              )}
              
              {messages.map((msg, i) => (
                <MessageBubble
                  key={msg._id || i}
                  message={msg}
                  isMine={String(msg.sender?._id || msg.sender) === String(myId)}
                  showAvatar={i === 0 || 
                    String(messages[i-1]?.sender?._id || messages[i-1]?.sender) !== 
                    String(msg.sender?._id || msg.sender)}
                  variant="default"
                />
              ))}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-3">
                <input
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    handleTyping();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="flex-1 border border-slate-300 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Type your message..."
                  disabled={!activeUserId}
                  rows={1}
                />
                <button
                  onClick={sendMessage}
                  disabled={!activeUserId || !text.trim()}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>Send</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              {/* Additional Actions */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-500 hover:text-indigo-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="p-2 text-slate-500 hover:text-indigo-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-xs text-slate-500">
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}