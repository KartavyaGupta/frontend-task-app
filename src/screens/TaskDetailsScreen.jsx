import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import API from "../api";

const TaskDetailsScreen = ({ route, navigation }) => {
  const { taskId, fetchTasks } = route.params;
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${taskId}`);
      setTask(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleUpdate = async () => {
    try {
      await API.put(`/tasks/${taskId}`, { title, description });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${taskId}`);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (!task) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>
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
      <Button
        mode="contained"
        onPress={() => {
          handleUpdate();
          fetchTasks();
        }}
        style={styles.button}
      >
        Update
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          handleDelete();
          fetchTasks();
        }}
        style={styles.buttonOutline}
      >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b5998", // Facebook blue
    textAlign: "center",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#3b5998",
  },
  input: {
    width: "100%",
    marginVertical: 5,
  },
  button: {
    width: "100%",
    marginVertical: 10,
  },
  buttonOutline: {
    width: "100%",
    marginVertical: 10,
  },
});

export default TaskDetailsScreen;
