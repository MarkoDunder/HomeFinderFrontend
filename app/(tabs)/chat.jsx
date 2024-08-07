import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = io(process.env.BACKEND_API_URL);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    socket.emit("sendMessage");
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      alert(data.message);
    });
  }, [socket]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text> Chat!</Text>
    </SafeAreaView>
  );
};

export default Chat;
