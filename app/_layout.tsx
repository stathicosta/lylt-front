import { Stack, SplashScreen } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="needInternetConnection"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="authError"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, animation: "fade" }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
