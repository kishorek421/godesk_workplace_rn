import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Modalize } from "react-native-modalize";
import RBSheet from "react-native-raw-bottom-sheet";

type ImagePickerComponentProps = {
  onImagePicked: (uri: string) => void;
  modalizeRef: any;
  setIsModalVisible: any;
  refRBSheet: any;
};

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  onImagePicked,
  modalizeRef,
  setIsModalVisible,
  refRBSheet,
}) => {
  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        alert(
          "Sorry, we need camera and media library permissions to make this work!",
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onImagePicked(uri);
      closeModal();
    }
  };

  const takePhoto = async () => {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onImagePicked(uri);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    modalizeRef.current?.close();
  };

  return (
    // <Modalize
    //   ref={modalizeRef}
    //   onClose={closeModal}
    //   snapPoint={180}
    //   withOverlay={true}
    //   handlePosition="inside"
    // >
    //   <View style={styles.modalContent}>
    //     <TouchableOpacity style={styles.option} onPress={pickImage}>
    //       <Text style={styles.optionText}>Pick an Image from Gallery</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.option} onPress={takePhoto}>
    //       <Text style={styles.optionText}>Take a Photo</Text>
    //     </TouchableOpacity>
    //   </View>
    // </Modalize>
    <RBSheet
      ref={refRBSheet}
      useNativeDriver={true}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.option} onPress={pickImage}>
          <Text style={styles.optionText}>Pick an Image from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={takePhoto}>
          <Text style={styles.optionText}>Take a Photo</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default ImagePickerComponent;
