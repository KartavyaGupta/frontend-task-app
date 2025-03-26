import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
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
        <Button mode="contained" onPress={logout} style={styles.button}>
          Logout
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("AddTask", { fetchTasks: fetchTasks })
          }
          style={styles.button}
        >
          Add Task
        </Button>

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
    marginVertical: 5,
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
