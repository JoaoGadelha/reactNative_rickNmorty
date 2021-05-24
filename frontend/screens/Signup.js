import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Animated,
  Image,
  Keyboard,
} from "react-native";
import { postData } from "../functions/postData";

const Signup = ({ navigation }) => {
  let [loading, setLoading] = useState(false);
  let [serverResponse, setServerResponse] = useState([]);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [offset, setOffset] = useState(new Animated.ValueXY({ x: 0, y: -800 }));
  let [opacity, setOpacity] = useState(new Animated.Value(0));
  let [showImage, setShowImage] = useState(true);

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

  let Signup = async () => {
    let reqUrl = "https://joao-gadelha-rick-n-morty.herokuapp.com/createUser";
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
    setServerResponse(await Signup());
    navigation.navigate("Login");
  };

  useEffect(() => {
    setLoading(false);
  }, [serverResponse]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {showImage && (
          <Image style={styles.image} source={require("../assets/logo.png")} />
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
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#d3d3d3"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#d3d3d3"
        />
        <TouchableOpacity
          style={styles.button1}
          title="Signup"
          onPress={pressHandler}
        >
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          title="Signup"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Back to login menu</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
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
  image: { width: 330, height: 100 },
});

export default Signup;
