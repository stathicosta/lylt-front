import { theme } from "@/theme";
import { StyleSheet, Text, Pressable } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export function LyltButton({ title, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        if (pressed) {
          return [styles.button, styles.buttonPressed];
        }
        return styles.button;
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: theme.colorBlue,
  },
  buttonPressed: {
    backgroundColor: theme.colorDarkBlue,
  },
});
