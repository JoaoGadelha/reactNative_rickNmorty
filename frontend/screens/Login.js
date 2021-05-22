import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { postData } from "../functions/postData";

const Login = ({ navigation }) => {
  [email, setEmail] = useState("");
  [password, setPassword] = useState("");
  [authResponse, setAuthResponse] = useState([]);

  let [auth, setAuth] = useState(false);
  let [serverResponse, setServerResponse] = useState([]);

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
    setAuthResponse(await authUsr());
    if (authResponse.message === "loggedin") {
      navigation.navigate("CharList", {clientID:authResponse.clientID});
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button}>
        <Button
          style={styles.buttonText}
          title="Login"
          onPress={pressHandler}
        ></Button>
      </TouchableOpacity>
      <Button
        title="Don't have an account yet? Sign up"
        onPress={() => navigation.navigate("Signup")}
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
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
});

export default Login;
