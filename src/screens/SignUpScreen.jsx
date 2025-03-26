import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { AuthContext } from "../context/AuthContext.jsx";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      // Validate form data using Yup
      await SignupSchema.validate({
        name,
        email,
        password,
        passwordConfirmation,
      });

      // Clear any previous error if validation passes
      setError("");

      const res = await signup(name, email, password, passwordConfirmation);
      console.log(res);
      if (res.message !== "registration successfull") {
        setError("Registration failed");
      } else {
        navigation.replace("Login");
      }
    } catch (err) {
      // If the error is a Yup validation error, display its message
      if (err.name === "ValidationError") {
        setError(err.message);
      } else {
        alert("Signup failed. Possibly user already exists.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Password Confirmation"
        mode="outlined"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Signup
      </Button>
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
    marginVertical: 5,
  },
  button: {
    width: "100%",
    marginVertical: 10,
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
