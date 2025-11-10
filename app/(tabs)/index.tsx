import { theme } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const { width } = Dimensions.get("window");
const qrSize = Math.min(Math.max(width * 0.7, 150), 300);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <QRCode
        value="something"
        size={qrSize}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    alignItems: "center",
    justifyContent: "center",
  },
});
