import { Slot } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
        <Slot />
        <FAB 
            icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
            onPress={toggleTheme}
            style={styles.fab}
            size="small"
            variant="surface"
          />
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  fab : {
    position: 'absolute',
    right: 16,
    bottom: 16,
  }
});
