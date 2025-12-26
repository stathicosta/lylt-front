import { theme } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { use, useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { Text } from "@/components/ui/text";

const { width } = Dimensions.get("window");
const qrSize = Math.min(Math.max(width * 0.7, 150), 300);

export default function App() {
  const qrCode = useUserStore((state) => state.qrCode);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{qrCode}</Text>
      <QRCode
        value={qrCode ?? ""}
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
