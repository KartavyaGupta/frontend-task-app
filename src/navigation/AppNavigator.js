import react, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen.jsx";
import SignupScreen from "../screens/SignUpScreen.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";
import AddTaskScreen from "../screens/AddTaskScreen.jsx";
import TaskDetailsScreen from "../screens/TaskDetailsScreen.jsx";
import LogoutButton from "../screens/LogoutButton.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { token } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
