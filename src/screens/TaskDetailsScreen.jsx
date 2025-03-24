import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleUpdate();
          fetchTasks();
        }}
      >
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => {
          handleDelete();
          fetchTasks();
        }}
      >
        <Text style={styles.buttonOutlineText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    borderWidth: 1,
    borderColor: "#3b5998",
    borderRadius: 5,
    padding: 12,
    marginVertical: 5,
    color: "#000",
  },
  button: {
    width: "100%",
    backgroundColor: "#3b5998",
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
  buttonOutline: {
    width: "100%",
    borderColor: "#3b5998",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#3b5998",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskDetailsScreen;
