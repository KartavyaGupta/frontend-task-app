import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../context/AuthContext.jsx";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // prevent multiple taps
    setIsLoggingOut(true);
    console.log("Logout button pressed");
    await logout();
    console.log("Logout function finished");
    setIsLoggingOut(false);
  };

  return (
    <Button
      mode="contained"
      onPress={handleLogout}
      disabled={isLoggingOut}
      style={styles.button}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});

export default LogoutButton;
