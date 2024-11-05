import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Password Generator</Text>
        </View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>

        <View style={styles.BtnContainer}>
          <TouchableOpacity style={styles.Btn}>
            <Text style={styles.BtnTxt}>Generate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn}>
            <Text style={styles.BtnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0.02 * height,
  },
  headingText: {
    fontSize: 0.04 * height,
    fontWeight: "bold",
    color: "#00295C",
  },
  inputContainer: {},
  BtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 0.02 * height,
    gap: 0.15 * width,
  },
  Btn: {
    backgroundColor: "#015BCC",
    padding: 0.015 * height,
    paddingHorizontal: 0.06 * width,
    borderRadius: 0.02 * width,
  },
  BtnTxt: {
    color: "#fff",
    fontSize: 0.02 * height,
    fontWeight: "bold",
    textAlign: "center",
  },
});
