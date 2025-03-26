import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
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

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("TaskDetails", {
          taskId: item._id,
          fetchTasks: fetchTasks,
        })
      }
    >
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Tap to edit/delete</Paragraph>
      </Card.Content>
    </Card>
  );

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
          renderItem={renderItem}
          contentContainerStyle={styles.list}
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
    backgroundColor: "#f2f2f2",
    paddingTop: 40,
  },
  button: {
    marginVertical: 5,
  },
  list: {
    paddingVertical: 10,
  },
  card: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3, // adds a subtle shadow for Android
    // For iOS, you can also add shadow properties if needed:
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default HomeScreen;
