import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
} from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { ThemedView } from "./ui/ThemedView";
import { ThemedText } from "./ui/ThemedText";
import { VStack } from "@/components/ui/vstack";
import {
  useAsyncStorageGet,
  useAsyncStorageUpdate,
} from "@/hooks/useAsyncStorage";
import { IBooskshelfData } from "@/types/async-storage";
import { colors } from "./ui/colors";

interface Book {
  name: string;
  url: string;
}

const BookList = ({
  books,
  deleteBook,
}: {
  books: Book[];
  deleteBook: (index: number) => void;
}) => {
  return (
    <VStack space="md">
      {books.map((item, index) => (
        <View
          key={`${item.name}-${index}`}
          style={styles.bookItem} // Apply custom styles if needed
        >
          <View style={styles.bookInfo}>
            <ThemedText>{item.name}</ThemedText>
            <ThemedText style={styles.bookUrl}>{item.url}</ThemedText>
          </View>
          <TouchableOpacity
            onPress={() => deleteBook(index)}
            style={styles.deleteButton}
          >
            <ThemedText style={styles.deleteText}>Delete</ThemedText>
          </TouchableOpacity>
        </View>
      ))}
    </VStack>
  );
};

const Bookshelf = () => {
  const [bookName, setBookName] = useState("");
  const [notionUrl, setNotionUrl] = useState("");

  const STORAGE_KEY = "@bookshelf";

  const {
    data: bookshelfData,
    loading: isBookshelfLoading,
    reload: reloadBookshelf,
  } = useAsyncStorageGet<IBooskshelfData>(STORAGE_KEY);

  const { updateData: updateBookShelf, loading: isUpdatingBookshelf } =
    useAsyncStorageUpdate({ onSuccess: reloadBookshelf });

  // Add a book to the list
  const addBook = () => {
    if (!bookName.trim() || !notionUrl.trim()) {
      Alert.alert("Error", "Both fields are required.");
      return;
    }
    const newBook: Book = { name: bookName.trim(), url: notionUrl.trim() };
    updateBookShelf(STORAGE_KEY, {
      books: [...(bookshelfData?.books || []), newBook],
    });
  };

  // Remove a book from the list
  const deleteBook = (index: number) => {
    const updatedBooks = (bookshelfData?.books || []).filter(
      (_, i) => i !== index
    );
    updateBookShelf(STORAGE_KEY, {
      books: updatedBooks,
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Add Book Section */}
      <ThemedView style={styles.addBookContainer}>
        <TextInput
          style={styles.input}
          placeholder="Book Name"
          value={bookName}
          onChangeText={setBookName}
        />
        <TextInput
          style={styles.input}
          placeholder="Notion Page URL"
          value={notionUrl}
          onChangeText={setNotionUrl}
        />
        {isUpdatingBookshelf ? (
          <Button className="p-3" isDisabled>
            <ButtonSpinner color={colors.gray[400]} />
            <ButtonText className="font-medium text-sm ml-2">
              Adding books...
            </ButtonText>
          </Button>
        ) : (
          <Button className="p-3" onPress={addBook}>
            <ButtonText className="font-medium text-sm ml-2">
              Add Book
            </ButtonText>
          </Button>
        )}
      </ThemedView>

      {/* Book List Section */}

      {isBookshelfLoading && (
        <ThemedText style={styles.emptyMessage}>
          Loading bookshelf...
        </ThemedText>
      )}
      {bookshelfData?.books?.length === 0 ? (
        <ThemedText style={styles.emptyMessage}>
          Please add a book to your bookshelf.
        </ThemedText>
      ) : (
        <BookList books={bookshelfData?.books || []} deleteBook={deleteBook} />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  addBookContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  bookInfo: {
    flex: 1, // Ensures the text occupies available space
    marginRight: 10, // Adds space between the text and the delete button
  },
  bookListContainer: {
    flex: 1,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  bookItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  bookName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookUrl: {
    fontSize: 14,
    color: "gray",
    flexWrap: "wrap", // Allows the text to wrap if necessary
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Bookshelf;
