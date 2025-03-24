import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../api";

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    console.log("fetch task chala");
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("AddTask", { fetchTasks: fetchTasks })
          }
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Text
              style={styles.taskItem}
              onPress={() =>
                navigation.navigate("TaskDetails", {
                  taskId: item._id,
                  fetchTasks: fetchTasks,
                })
              }
            >
              {item.title + " - tap to edit/delete"}
            </Text>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  button: {
    backgroundColor: "#3b5998", // Facebook blue
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#3b5998",
    marginVertical: 5,
    borderRadius: 5,
    color: "#000",
  },
});

export default HomeScreen;
