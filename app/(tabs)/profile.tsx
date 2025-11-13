import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { ScrollView, StyleSheet } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { theme } from "@/theme";
import { Divider } from "@/components/ui/divider";
import { Icon, EditIcon, MailIcon, PhoneIcon } from "@/components/ui/icon";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen() {
  const router = useRouter();
  const logoutUser = useUserStore((state) => state.logOutUser);
  // TODO: Fetch and display actual user data
  const userProfileName = "John";
  const userProfileSurname = "Doe";
  const userProfileEmail = "john.doe@example.com";
  const userProfilePhoneNumber = "+1234567890";

  const handleLogout = () => {
    logoutUser();
    router.replace("/login");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <VStack space="md">
        <HStack className="justify-left flex-1 items-left">
          <Text className="text-3xl">{userProfileName}</Text>
          <Text className="text-3xl px-1">{userProfileSurname}</Text>
        </HStack>

        <Divider className="border-outline-200 border" />
        <Text className="text-xl font-medium">About</Text>
        <HStack className="justify-left flex-1 items-center">
          <Icon as={MailIcon} className="lg px-4" />
          <Text className="text-lg px-2">{userProfileEmail}</Text>
        </HStack>

        <HStack className="justify-between flex-1 items-center">
          <HStack className="justify-left flex-1 items-center">
            <Icon as={PhoneIcon} className="lg px-4" />
            <Text className="text-lg px-2">{userProfilePhoneNumber}</Text>
          </HStack>
          <Icon as={EditIcon} className="px-1" />
        </HStack>
        <Divider className="border-outline-200 border" />
        <HStack className="justify-left flex-1 items-center">
          <Ionicons
            className="px-1"
            name="exit-outline"
            size={24}
            color="black"
          />
          <Text onPress={handleLogout} className="text-lg px-2">
            Log out
          </Text>
        </HStack>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
});
