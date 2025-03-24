import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/AuthContext.jsx";

const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await signup(name, email, password, passwordConfirmation);
      console.log(res);
      if (res.message !== "registration successfull") {
        console.log("coming here");
        setError("Registration failed");
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      alert("Signup failed. Possibly user already exists.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Password Confirmation"
        placeholderTextColor="#999"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background for clarity
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3b5998", // Facebook blue
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#3b5998", // Facebook blue
    borderRadius: 5,
    padding: 12,
    marginVertical: 5,
    color: "#000",
  },
  button: {
    width: "100%",
    backgroundColor: "#3b5998", // Facebook blue
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#d93025", // A Facebook-inspired red
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignupScreen;
