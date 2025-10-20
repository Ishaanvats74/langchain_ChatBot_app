import React from 'react';
import { View, TextInput,TextInputProps, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // install with: expo install @expo/vector-icons

interface InputTextBoxProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  value: string; // explicitly type value
  onChangeText: (text: string) => void;
  onSend: () => void; // for send button
  placeholder?: string;
}

const InputTextBox: React.FC<InputTextBoxProps> = ({ value, onChangeText, onSend, placeholder = 'Type your message...' }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Ionicons name="send" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default InputTextBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF', 
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});

 