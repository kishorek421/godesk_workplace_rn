import React, { useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface BottomSheetProps {
  children: any;
  initialHeight: number;
}

const BottomSheet = ({ children, initialHeight = 300 }: BottomSheetProps) => {
  const animatedHeight = useRef(new Animated.Value(initialHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newHeight = initialHeight - gestureState.dy;
        if (newHeight < screenHeight && newHeight > 0) {
          animatedHeight.setValue(newHeight);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0) {
          // Swipe down - close
          Animated.timing(animatedHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // Swipe up - open
          Animated.timing(animatedHeight, {
            toValue: initialHeight,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bottomSheet,
        { height: animatedHeight, maxHeight: screenHeight },
      ]}
    >
      <View style={styles.handle} />
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  handle: {
    width: 60,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default BottomSheet;
