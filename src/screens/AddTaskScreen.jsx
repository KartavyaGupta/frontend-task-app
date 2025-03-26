import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import API from "../api";

const AddTaskScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { fetchTasks } = route.params;

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
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description"
        mode="outlined"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddTask} style={styles.button}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b5998",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
  },
});

export default AddTaskScreen;
