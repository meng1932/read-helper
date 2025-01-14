import { StyleSheet, Image, Platform, SafeAreaView } from "react-native";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Bookshelf from "@/components/Bookshelf";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/bookshelf-bg.png")}
          style={styles.headerImage}
        />
      }
    >
      <SafeAreaView style={styles.container}>
        <Bookshelf />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: "100%",
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flex: 1,
  },
});
