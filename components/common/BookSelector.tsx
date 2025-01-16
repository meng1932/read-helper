import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Book, TABS, TABS_FORM_STORAGE_KEY_MAP } from "@/types";
import {
  useAsyncStorageGet,
  useAsyncStorageUpdate,
} from "@/hooks/useAsyncStorage";
import { IBooskshelfData } from "@/types/async-storage";
import { colors } from "../ui/colors";
import { useFocusEffect } from "expo-router";

export interface IBookSelector {
  tab: TABS;
  onBookSelected?: (book: Book | null) => void; // Callback for selected book
}

const BookSelector = ({ tab }: IBookSelector) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const {
    data: bookshelf,
    loading,
    error: getBookshelfError,
    reload: refresh,
  } = useAsyncStorageGet<IBooskshelfData>("@bookshelf");
  const { updateData: updateStorage, error: updateBookshelfError } =
    useAsyncStorageUpdate();

  if (getBookshelfError || updateBookshelfError)
    console.log(getBookshelfError || updateBookshelfError);

  // Load books from AsyncStorage
  useEffect(() => {
    if (bookshelf) {
      setBooks(bookshelf.books || []);
    }
  }, [bookshelf]);

  // Refresh when tab comes into focus
  useFocusEffect(
    useCallback(() => {
      refresh(); // Trigger a refresh of the AsyncStorage data
    }, [refresh])
  );

  // Handle card selection
  const handleSelection = async (book: Book) => {
    setSelectedBook(book.url);
    updateStorage(TABS_FORM_STORAGE_KEY_MAP[tab], { notionPageId: book.url });
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      contentContainerStyle={styles.container} // Use FlatList's own styling
      data={books}
      keyExtractor={(item) => item.url}
      numColumns={1}
      scrollEnabled={false} //tobe used in a scroll view
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          Please add books to your bookshelf.
        </Text>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.card,
            selectedBook === item.url && styles.selectedCard,
          ]}
          onPress={() => handleSelection(item)}
        >
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16, // Use padding for spacing
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 16,
  },
  card: {
    margin: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCard: {
    backgroundColor: colors.mutsu[200],
    borderColor: colors.mutsu[400],
    borderWidth: 2,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
});

export default BookSelector;
