import { theme } from "@/theme";
import { Text, View, StyleSheet } from "react-native";
import { LyltButton } from "@/components/LyltButton";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function ProfileScreen() {
  const router = useRouter();
  const logoutUser = useUserStore((state) => state.logOutUser);
  const handleLogout = () => {
    logoutUser();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <LyltButton title="Log out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  text: {
    fontSize: 24,
  },
});
