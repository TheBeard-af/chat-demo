import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  user,
}) => {
  const actionSheet = useActionSheet();

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/").pop();
    return `${user._id}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRef = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRef);

    const response = await fetch(imageURI);
    const blob = await response.blob();

    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend([
        {
          _id: `${user._id}-${Date.now()}`,
          createdAt: new Date(),
          user,
          image: imageURL,
        },
      ]);
    });
  };

  const pickImage = async () => {
    const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permissions to access media library were not granted");
    }
  };

  const takePhoto = async () => {
    const permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permissions to access camera were not granted");
    }
  };

  const getLocation = async () => {
    const permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});

      if (location) {
        onSend([
          {
            _id: `${user._id}-${Date.now()}`,
            createdAt: new Date(),
            user,
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          },
        ]);
      }
    } else {
      Alert.alert("Permissions to access location were not granted");
    }
  };

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
            return;
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="More options"
      accessibilityHint="Opens menu to share images or location"
      accessibilityRole="button"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
