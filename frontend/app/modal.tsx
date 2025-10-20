import InputTextBox from '@/components/InputTextBox';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

export default function HomeScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
  if (inputText.trim() === "") return;

  // Add user message
  setMessages((prev) => [
    ...prev,
    { id: Date.now().toString(), text: inputText, sender: "user" },
  ]);

  setInputText("");

  // Add "Bot is thinking..." message
  const thinkingId = Date.now() + 1;
  setMessages((prev) => [
    ...prev,
    { id: thinkingId.toString(), text: "Bot is thinking...", sender: "bot", thinking: true },
  ]);

  try {
    const res = await fetch("http://192.168.1.10:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputText }),
    });
    const data = await res.json();

    // Replace the "thinking" message with actual response
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === thinkingId.toString()
          ? { ...msg, text: data.response, thinking: false }
          : msg
      )
    );
  } catch (error) {
    // If API fails, update thinking message
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === thinkingId.toString()
          ? { ...msg, text: "Bot failed to respond 😢", thinking: false }
          : msg
      )
    );
    console.error(error);
  }
};



  const renderMessage = ({ item }) => (
    <View
    style={[
      styles.messageBubble,
      item.sender === "user" ? styles.userBubble : styles.botBubble,
    ]}
  >
    <Text style={{ color: item.sender === "user" ? "#fff" : "#000", fontStyle: item.thinking ? "italic" : "normal" }}>
      {item.text}
    </Text>
  </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
      />

      <InputTextBox
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end',
  },
  messagesContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 4,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
});
