import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import API from "../api";

const AddTaskScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { fetchTasks } = route.params;
  console.log(route.params);

  const handleAddTask = async () => {
    try {
      await API.post("/tasks", { title, description });
      await fetchTasks();
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleAddTask();
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b5998", // Facebook blue
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#3b5998", // Facebook blue
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    color: "#000",
  },
  button: {
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
});

export default AddTaskScreen;
