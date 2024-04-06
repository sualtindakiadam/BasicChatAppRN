import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text,KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { ref, onValue, push, serverTimestamp } from "firebase/database";
import { useRoute } from '@react-navigation/native';
import MessageCard from './MessageCard';
import { db } from '../firebaseConfig';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const route = useRoute();
  const { email } = route.params as {  email: string };
  const flatListRef = useRef<FlatList<any>>(null); // FlatList referansı

  // Firebase'den mesajları dinleme
  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setMessages(messagesArray);
      }
    });
  }, []);


  const handleSendMessage = () => {
    push(ref(db, 'messages'), {
      email: email,
      message: newMessage,
      timestamp: serverTimestamp()
    }).then((res) => {
      setNewMessage('');
    }).catch((error) => {
    });
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef} 
        data={messages}
        onContentSizeChange={() => scrollToBottom()}
        renderItem={({ item }) => (
          <MessageCard
            userEmail={email}
            email={item.email}
            message={item.message}
            timestamp={new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          onChangeText={text => setNewMessage(text)}
          value={newMessage}
        />
        <TouchableOpacity
          style={[styles.button, { height: styles.input.height }]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderTopWidth: 0.5,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    height: 40, 
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
