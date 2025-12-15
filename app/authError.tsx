import { ScrollView, StyleSheet } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { theme } from "@/theme";

export default function AuthError({ message }: { message: string }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <VStack space="md">
        <HStack className="justify-left flex-1 items-left"></HStack>

        <HStack className="justify-left flex-1 items-center">
          <Text className="text-3xl">Authentication Error</Text>
          <Text className="text-lg">{message}</Text>
        </HStack>

        <HStack className="justify-between flex-1 items-center"></HStack>
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
