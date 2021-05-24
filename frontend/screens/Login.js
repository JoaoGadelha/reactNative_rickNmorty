import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  ActivityIndicator,
  TextInput,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  KeyboardAvoidingView,
  Image,
  Animated,
} from "react-native";
import { postData } from "../functions/postData";

const Login = ({ navigation }) => {
  let [loading, setLoading] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [authResponse, setAuthResponse] = useState([]);
  let [offset, setOffset] = useState(new Animated.ValueXY({ x: 0, y: -800 }));
  let [opacity, setOpacity] = useState(new Animated.Value(0));
  let [auth, setAuth] = useState(false);
  let [serverResponse, setServerResponse] = useState([]);
  let [showImage, setShowImage] = useState(true);
  const fillAllFieldsAlert = () =>
    Alert.alert("Please fill in both e-mail and password input fields", "", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const userDoesntExistAlert = () =>
    Alert.alert("User does not exist", "", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const wrongInputAlert = () =>
    Alert.alert("Wrong e-mail or password", "", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  let authUsr = async () => {
    let reqUrl = "https://joao-gadelha-rick-n-morty.herokuapp.com/authUsr";
    let data = {
      email: email,
      password: password,
    };
    let response = await postData(reqUrl, data);
    return response;
  };

  const pressHandler = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setAuthResponse(await authUsr());
  };

  useEffect(() => {
    setLoading(false);
    console.log(authResponse.message);
    if (authResponse.message === "loggedin") {
      console.log(authResponse);
      navigation.navigate("CharList", {
        clientID: authResponse.clientID,
        favorites: authResponse.favorites,
      });
    } else {
      if (authResponse.message === "-1") {
        userDoesntExistAlert();
      } else {
        if (authResponse.message === "-2") {
          wrongInputAlert();
        } else {
          if (authResponse.message === "-3") {
            fillAllFieldsAlert();
          }
        }
      }
    }
  }, [authResponse]);

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: -0,
        speed: 8,
        bounciness: 20,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const keyboardDidShow = () => {
    setShowImage(false);
  };

  const keyboardDidHide = () => {
    setShowImage(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        {showImage && (
          <Image
            style={styles.image}
            source={require("../assets/logo.png")}
          />
        )}
      </View>
      {loading && <ActivityIndicator size={50} color="#fff" />}
      <Animated.View
        style={[
          styles.inputContainer,
          { opacity: opacity, transform: [{ translateY: offset.y }] },
        ]}
      >
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="E - mail"
          placeholderTextColor="#d3d3d3"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          placeholderTextColor="#d3d3d3"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button1} onPress={pressHandler}>
          <Text style={styles.buttonText}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    width: 300,
  },
  input: {
    alignSelf: "stretch",
    color: "#d3d3d3",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  image: {
    width:330,
    height:100
  },
  button1: {
    backgroundColor: "#22a2bd",
    height: 50,
    color: "white",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  button2: {
    backgroundColor: "#4a9c2a",
    height: 50,
    color: "white",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Login;
