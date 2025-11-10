import { Stack } from "expo-router";

export default function Laygout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
}
