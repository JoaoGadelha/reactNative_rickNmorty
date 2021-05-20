import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";

const Login = ({ navigation }) => {
  [email, setEmail] = useState("");
  [password, setPassword] = useState("");

  let [auth, setAuth] = useState(false);
  let [serverResponse, setServerResponse] = useState([]);
  let request =
    "https://api-do-joao.herokuapp.com/find/id/5f6ccf7f2c135c3ee6ad7cec?searchOptions=id";

  useEffect(() => {}, []);

  const pressHandler = () => {
    let requestAPI = async () => {
      let response = await fetch(request);
      let json = await response.json();
      setServerResponse(json);
      if (json[0].type === "bed") {
        navigation.navigate('CharList')
      }
    };
    requestAPI();
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
          title='Login'
          onPress={pressHandler}
        >
        </Button>
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
