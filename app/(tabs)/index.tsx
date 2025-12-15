import { theme } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");
const qrSize = Math.min(Math.max(width * 0.7, 150), 300);

export default function App() {
  const [qrCode, setQrCode] = useState<string>("hello world");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <QRCode
        value={qrCode}
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
