import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#090C08");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
    >
      <Text style={styles.title}>Chat App</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />

        <Text style={styles.label}>Choose background color</Text>
        <View style={styles.colorOptions}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => setBackgroundColor(color)}
              style={[
                styles.colorOuter,
                backgroundColor === color && styles.selectedColor,
              ]}
            >
              <View style={[styles.colorInner, { backgroundColor: color }]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Chat", {
              name,
              backgroundColor,
            })
          }
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "88%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 220,
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },
  textInput: {
    width: "100%",
    fontWeight: "300",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#757083",
    marginBottom: 20,
    opacity: 0.5,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },

  colorOuter: {
    width: 50,
    height: 50,
    borderRadius: 25, // ✅ perfect circle
    justifyContent: "center",
    alignItems: "center",
  },

  colorInner: {
    width: 40,
    height: 40,
    borderRadius: 20, // ✅ half of width
  },

  selectedColor: {
    borderWidth: 2,
    borderColor: "#757083",
  },

  button: {
    width: "100%",
    backgroundColor: "#757083",
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
