import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ route, navigation, db, storage, isConnected }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" },
        left: { backgroundColor: "#FFF" },
      }}
    />
  );

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const hasSentSystemMessage = useRef(false);

  useEffect(() => {
    navigation.setOptions({ title: name });

    let unsubMessages;

    if (isConnected === true) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      if (!hasSentSystemMessage.current) {
        addDoc(collection(db, "messages"), {
          _id: `${userID}-${Date.now()}`,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true,
        });
        hasSentSystemMessage.current = true;
      }

      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          const data = doc.data();
          newMessages.push({
            _id: doc.id,
            ...data,
            createdAt: data.createdAt
              ? new Date(data.createdAt.toMillis())
              : new Date(),
          });
        });

        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  };

  const renderCustomActions = (props) => {
    return (
      <CustomActions
        {...props}
        onSend={onSend}
        storage={storage}
        user={{
          _id: userID,
          name: name,
        }}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;

    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
        bottomOffset={Platform.OS === "ios" ? -20 : -40}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
