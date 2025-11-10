import { View, StyleSheet, Button } from "react-native";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const logInUser = useUserStore((state) => state.toggleHadOnLogin);
  const handlePress = () => {
    logInUser();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Button onPress={handlePress} title="Log in!" />
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
});
