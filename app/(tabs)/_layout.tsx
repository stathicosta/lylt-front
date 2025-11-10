import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";

export default function Layout() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorBlue }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="qrcode" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
