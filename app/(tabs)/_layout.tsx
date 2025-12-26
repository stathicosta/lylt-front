import { Tabs, SplashScreen, router } from "expo-router";
import { AppState } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { supabase, getUserQrCode } from "@/helpers/supabaseSecureStore";
import { useEffect, useState } from "react";

//CWIP TODO: validate the splash screen works
export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      //TODO validate that indeed this is only registered once
      // make sure you register this only once!
      AppState.addEventListener("change", (state) => {
        if (state === "active") {
          supabase.auth.startAutoRefresh();
        } else {
          supabase.auth.stopAutoRefresh();
        }
      });

      try {
        // const networkState = await Network.getNetworkStateAsync();
        // const hasInternetAccess = networkState.isInternetReachable ?? false;

        const { data, error } = await supabase.auth.getSession();
        console.debug("---session data---", data, "----");
        console.debug("---session error---", error, "----");

        if (error) {
          throw error;
        }

        const isUserLoggedIn = data.session !== null;

        if (isUserLoggedIn) {
          setIsLoading(false);
          return;
        }

        if (!isUserLoggedIn) {
          console.debug("->signin as anonymous user");
          const {
            data: { user, session },
            error,
          } = await supabase.auth.signInAnonymously();

          console.debug("---user details---", user, "---");
          console.debug("---session data---", session, "---");

          // in case there is an error or there is no session
          // probably means we are offline and we cant do something more
          if (error || !user || !session) {
            throw error;
          }

          const qrCode = await getUserQrCode(session.user.id);
          useUserStore.getState().setQrCode(qrCode);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("While fetching user session:", error);
        return router.replace({
          pathname: "/authError",
          params: { message: `Error signing in user...` },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  // We set this to avoid rendering tabs before app is ready
  if (isLoading) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
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
            headerShown: true,
            title: "profile",
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
