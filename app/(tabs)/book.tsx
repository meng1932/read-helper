import { Image, StyleSheet, TextInput } from "react-native";
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

interface BookTabData {
  notionPageId?: string;
}

export default function BookScreen() {
  const [quote, setQuote] = useState("");
  const [comment, setComment] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const {
    data: bookTabData,
    loading,
    error: loadingNotionPageId,
  } = useAsyncStorageGet<BookTabData>(
    TABS_FORM_STORAGE_KEY_MAP[TABS.PHYSICAL_BOOK]
  );
  const {
    mutateAsync: updateNotionPage,
    isLoading: updatingNotion,
    error: updateNotionError,
  } = useNotionUpdate();

  const {
    mutateAsync: getOCR,
    isLoading: gettingOcr,
  } = useOCR({
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
    await getOCR(imageUri || "");
  };

  const steps = [
    <ThemedView style={styles.step}>
      <ThemedText>Select a book</ThemedText>
      <BookSelector tab={TABS.PHYSICAL_BOOK} />
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Select a picture</ThemedText>
      <CameraWindow
        capturedPhoto={capturedPhoto}
        setCapturedPhoto={setCapturedPhoto}
      />
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Edit the quote</ThemedText>
      <TextInput
        style={styles.input}
        value={quote}
        onChangeText={(value) => setQuote(value)}
      />
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Edit your comment</ThemedText>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={(value) => setComment(value)}
      />
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Edit your chapter name (optional)</ThemedText>
      <TextInput
        style={styles.input}
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
      console.log("Form submitted:", {
        quote,
        comment,
        notionPageId: extractPageId(bookTabData.notionPageId),
      });
      const extractedNotionPageId=extractPageId(bookTabData.notionPageId)
      //add to current
      const blocksToPush = [];
      blocksToPush.push(toQuoteBlock(quote));
      blocksToPush.push(toTimeChapterBlock(chapterName));
      if (comment.length) {
        blocksToPush.push(toNoteBlock(comment));
      }
      blocksToPush.push(toDividerBlock());
      updateNotionPage(extractedNotionPageId||"", blocksToPush);
    } else {
      //create a new page
    }
  };

  return (
    <MultiStepForm
      steps={steps}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onStepChange={(stepIndex) => {
        console.log("Step changed to:", stepIndex);
        if (stepIndex === 2) {
          handleOCR();
        }
      }}
    />
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
});
