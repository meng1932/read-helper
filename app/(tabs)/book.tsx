import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { MultiStepForm } from "@/components/multi-step-form/MultiStepForm";
import BookSelector from "@/components/common/BookSelector";
import { TABS, TABS_FORM_STORAGE_KEY_MAP } from "@/types";
import { useEffect, useState } from "react";
import { useAsyncStorageGet } from "@/hooks/useAsyncStorage";
import {
  toQuoteBlock,
  toTimeChapterBlock,
  toNoteBlock,
  toDividerBlock,
} from "@/helper/notion";
import useNotionUpdate from "@/hooks/useUpdateNotionPage";
import { extractPageId } from "@/helper/uuid";
import CameraWindow from "@/components/Camera";
import useOCR from "@/hooks/useGetOCR";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import DynamicTextInput from "@/components/common/DynamicTextInput";
import ImagePickerExample from "@/components/ImagePicker";
import { compressImage } from "@/helper/image";

interface BookTabData {
  notionPageId?: string;
}

export default function BookScreen() {
  const [quote, setQuote] = useState("");
  const [comment, setComment] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const { data: bookTabData, loading: loadingBookTabData } =
    useAsyncStorageGet<BookTabData>(
      TABS_FORM_STORAGE_KEY_MAP[TABS.PHYSICAL_BOOK]
    );
  const { mutateAsync: updateNotionPage, isLoading: updatingNotion } =
    useNotionUpdate({
      onSuccess: () => {
        setQuote("");
        setComment("");
        setCapturedPhoto(null);
      },
    });

  const { mutateAsync: getOCR, isLoading: gettingOcr } = useOCR({
    onSuccess: (data) => {
      setQuote(data);
    },
  });

  const handleOCR = async () => {
    const imageUri = capturedPhoto;
    if (!imageUri) {
      console.log("No image to process");
      return;
    }
    const compressedImage = await compressImage(imageUri);
    await getOCR(compressedImage || "");
  };

  const steps = [
    <ThemedView style={styles.step}>
      <ThemedText>Select a book</ThemedText>
      {loadingBookTabData ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <BookSelector tab={TABS.PHYSICAL_BOOK} />
      )}
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Select a picture</ThemedText>
      <ImagePickerExample image={capturedPhoto} setImage={setCapturedPhoto} />
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Edit the quote</ThemedText>
      {gettingOcr ? (
        <ActivityIndicator />
      ) : (
        <DynamicTextInput
          value={quote}
          onChangeText={(value) => setQuote(value)}
        />
      )}
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Edit your comment</ThemedText>
      <DynamicTextInput
        value={comment}
        onChangeText={(value) => setComment(value)}
      />
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Edit your chapter name (optional)</ThemedText>
      <DynamicTextInput
        value={chapterName}
        onChangeText={(value) => setChapterName(value)}
      />
    </ThemedView>,
  ];

  const handleCancel = () => {
    console.log("Form canceled");
  };

  const handleSubmit = () => {
    if (bookTabData?.notionPageId && bookTabData?.notionPageId.length) {
      Alert.alert(
        "Submitting",
        JSON.stringify({
          quote,
          comment,
          notionPageId: extractPageId(bookTabData.notionPageId),
        })
      );
      console.log("Form submitted:", {
        quote,
        comment,
        notionPageId: extractPageId(bookTabData.notionPageId),
      });
      const extractedNotionPageId = extractPageId(bookTabData.notionPageId);
      //add to current
      const blocksToPush = [];
      blocksToPush.push(toQuoteBlock(quote));
      blocksToPush.push(toTimeChapterBlock(chapterName));
      if (comment.length) {
        blocksToPush.push(toNoteBlock(comment));
      }
      blocksToPush.push(toDividerBlock());
      updateNotionPage(extractedNotionPageId || "", blocksToPush);
    } else {
      //create a new page
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/bookshelf-bg.png")}
          style={styles.headerImage}
        />
      }
      //nestedScrollEnabled={true}
    >
      <SafeAreaView style={styles.container}>
        <MultiStepForm
          steps={steps}
          isSubmitting={updatingNotion}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          onStepChange={(stepIndex) => {
            console.log("Step changed to:", stepIndex);
            if (stepIndex === 2) {
              handleOCR();
            }
          }}
        />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  step: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  container: {
    height: "100%",
  },
  headerImage: {
    height: 250,
    width: "100%",
    position: "absolute",
  },
});
