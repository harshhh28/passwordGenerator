import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { Formik } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const { height, width } = Dimensions.get("window");

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .typeError("Length must be a number.")
    .required("Length is required.")
    .positive("Length must be a positive number.")
    .integer("Length must be an integer.")
    .min(6, "Length must be at least 6.")
    .max(16, "Length can be at most 16"),
});

export default function App() {
  const [password, setPassword] = useState("");
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = "";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()";

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += numberChars;
    }
    if (symbols) {
      characterList += symbolChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword("");
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Password Generator</Text>
        </View>
        <Formik
          initialValues={{ passwordLength: "" }}
          validationSchema={PasswordSchema}
          onSubmit={(values) => {
            generatePasswordString(+values.passwordLength);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <View style={styles.inputContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorTxt}>{errors.passwordLength}</Text>
                  )}
                </View>
                <TextInput
                  style={styles.inputTxt}
                  value={values.passwordLength}
                  onChangeText={handleChange("passwordLength")}
                  placeholder="Ex. 8"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.heading}>Include lowercase</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(!lowerCase)}
                  fillColor="#29AB87"
                  style={styles.checkbox}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.heading}>Include uppercase</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={upperCase}
                  onPress={() => setUpperCase(!upperCase)}
                  fillColor="#DBE346"
                  style={styles.checkbox}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.heading}>Include numbers</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={numbers}
                  onPress={() => setNumbers(!numbers)}
                  fillColor="#C9A0DC"
                  style={styles.checkbox}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.heading}>Include symbols</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={symbols}
                  onPress={() => setSymbols(!symbols)}
                  fillColor="#FC80A5"
                  style={styles.checkbox}
                />
              </View>
              <View style={styles.BtnContainer}>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={() => handleSubmit()}
                  style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnTxt}>Generate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleReset();
                    resetPasswordState();
                  }}
                  style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
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
  BtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 0.02 * height,
    gap: 0.15 * width,
  },
  primaryBtn: {
    backgroundColor: "#015BCC",
    padding: 0.015 * height,
    paddingHorizontal: 0.06 * width,
    borderRadius: 0.02 * width,
  },
  secondaryBtn: {
    backgroundColor: "#E5E5E5",
    padding: 0.015 * height,
    paddingHorizontal: 0.06 * width,
    borderRadius: 0.02 * width,
  },
  primaryBtnTxt: {
    color: "#ffffff",
    fontSize: 0.02 * height,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryBtnTxt: {
    color: "#000000",
    fontSize: 0.02 * height,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0.02 * height,
  },
  inputTxt: {
    borderWidth: 1,
    borderColor: "#015BCC",
    padding: 0.01 * height,
    paddingHorizontal: 0.05 * width,
    borderRadius: 0.02 * width,
    fontSize: 0.02 * height,
  },
  heading: {
    fontSize: 0.02 * height,
    fontWeight: "bold",
    color: "#015BCC",
  },
  checkbox: {
    width: 0.05 * width,
    height: 0.05 * width,
    paddingRight: 0.1 * width,
  },
  card: {
    flex: 1,
    margin: 0.02 * height,
    padding: 0.02 * height,
    borderRadius: 0.02 * width,
    backgroundColor: "#E5E5E5",
  },
  cardElevated: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subTitle: {
    fontSize: 0.02 * height,
    fontWeight: "bold",
    color: "#00295C",
  },
  description: {
    fontSize: 0.015 * height,
    color: "#00295C",
  },
  generatedPassword: {
    fontSize: 0.025 * height,
    color: "#00295C",
    fontWeight: "bold",
  },
  errorTxt: {
    color: "red",
    fontSize: 0.015 * height,
  },
});
