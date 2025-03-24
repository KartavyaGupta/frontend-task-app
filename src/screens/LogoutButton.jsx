// LogoutButton.jsx
import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
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
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogout}
      disabled={isLoggingOut}
    >
      <Text style={styles.buttonText}>
        {isLoggingOut ? "Logging out..." : "Logout"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    backgroundColor: "#3b5998", // Facebook blue
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LogoutButton;
