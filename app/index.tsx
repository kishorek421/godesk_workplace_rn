import { Text } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text>HomeScreen</Text>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
