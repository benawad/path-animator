import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SvgAnimator } from "./SvgAnimator";
import { exampleEndingPaths, exampleStartingPaths } from "./examplePaths";

interface AnimProps {}

export const Anim: React.FC<AnimProps> = ({}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SvgAnimator
        size={200}
        startingPaths={exampleStartingPaths}
        endingPaths={exampleEndingPaths}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
