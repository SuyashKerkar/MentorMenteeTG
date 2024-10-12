// src/pages/ChatPage.js
import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FaPaperclip } from "react-icons/fa"; // Importing paperclip icon

const ChatPage = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { sender: "Student 1", content: "Hello, everyone!" },
    { sender: "Student 2", content: "Hey! How's it going?" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [students] = useState([
    { id: 1, name: "Pooja Garai" },
    { id: 2, name: "Samruddhi Deshmukh" },
    { id: 3, name: "Aditya Nikam" },
    { id: 4, name: "Suyash Kerkar" },
  ]);

  const [showUploadOptions, setShowUploadOptions] = useState(false); // State for showing upload options
  const fileInputRef = useRef(null); // Reference to hidden file input

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", content: newMessage }]);
      setNewMessage("");
    }
  };

  const toggleUploadOptions = () => {
    setShowUploadOptions(!showUploadOptions);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages([
        ...messages,
        { sender: "You", content: `Sent a document: ${file.name}` },
      ]);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-1/3 bg-gray-100 p-4 h-full overflow-auto">
          <h2 className="font-bold text-xl mb-4">List of Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id} className="mb-2">
                <div className="p-2 bg-white rounded shadow-md hover:bg-gray-200 cursor-pointer">
                  {student.name}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              className="bg-red-500 text-white p-2 rounded w-20 hover:bg-red-600"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>

        <div className="w-2/3 bg-gray-50 p-4 h-full flex flex-col">
          <h2 className="font-bold text-xl mb-4">Mentor Chatbot</h2>

          <div className="flex-grow bg-white p-4 rounded shadow-md overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{message.sender}: </span>
                <span>{message.content}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-500 rounded"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            {/* Paperclip Icon for Document Upload */}
            <button className="ml-2" onClick={toggleUploadOptions}>
              <FaPaperclip className="text-gray-900 text-2xl" />
            </button>

            <button
              className="w-20 bg-blue-700 text-white p-2 rounded ml-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>

          {/* File Upload Options */}
          {showUploadOptions && (
            <div className="absolute bottom-16 right-24 bg-gray-200 shadow-lg rounded-lg p-4 w-40">
              <ul>
                <li
                  className="mb-2 hover:bg-gray-400 cursor-pointer p-2"
                  onClick={handleFileUploadClick}
                >
                  Document
                </li>
                <li
                  className="mb-2 hover:bg-gray-400 cursor-pointer p-2"
                  onClick={handleFileUploadClick}
                >
                  Photos & Videos
                </li>
                <li
                  className="mb-2 hover:bg-gray-400 cursor-pointer p-2"
                  onClick={handleFileUploadClick}
                >
                  Camera
                </li>
              </ul>
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hidden input
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
