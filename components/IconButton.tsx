import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function IconButton({
  icon,
  label,
  onPress,
}: {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
