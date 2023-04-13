import { useState } from "react";
import { FlatList, Image, Platform, Pressable, StyleSheet } from "react-native";

export default function EmojiList({
  onSelect,
  onCloseModal,
}: {
  onSelect: (item: any) => void;
  onCloseModal: () => void;
}) {
  const [emojis] = useState([
    require("../assets/memes/ala3na2.png"),
    require("../assets/memes/areyouseriousmeme.png"),
    require("../assets/memes/atmz7.png"),
    require("../assets/memes/dolan.png"),
    require("../assets/memes/feel_like_a_sir.png"),
    require("../assets/memes/forever_alone_face_only.png"),
    require("../assets/memes/fuuu.png"),
    require("../assets/memes/herp_derp_loading.png"),
    require("../assets/memes/herp_derp_love.png"),
    require("../assets/memes/lol_crazy.png"),
    require("../assets/memes/okay_clean.png"),
    require("../assets/memes/pokerface_clean.png"),
    require("../assets/memes/serious_not_okay.png"),
    require("../assets/memes/son_i_am_disappoint.png"),
    require("../assets/memes/surprised_rage_clean.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web" ? true : false}
      data={emojis}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
          >
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
