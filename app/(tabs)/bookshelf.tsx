import { StyleSheet, Image, Platform, SafeAreaView } from "react-native";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import Bookshelf from "@/components/Bookshelf";

export default function BookshelfScreen() {
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
  container: {
    flex: 1,
  },
});
