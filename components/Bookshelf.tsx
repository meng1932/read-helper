import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from './ui/ThemedView';
import { ThemedText } from './ui/ThemedText';

interface Book {
  name: string;
  url: string;
}

export default function Bookshelf() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookName, setBookName] = useState('');
  const [notionUrl, setNotionUrl] = useState('');

  const STORAGE_KEY = '@bookshelf';

  // Load books from AsyncStorage on mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedBooks) {
          setBooks(JSON.parse(storedBooks));
        }
      } catch (error) {
        console.error('Failed to load books:', error);
      }
    };

    loadBooks();
  }, []);

  // Save books to AsyncStorage whenever the list changes
  useEffect(() => {
    const saveBooks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      } catch (error) {
        console.error('Failed to save books:', error);
      }
    };

    saveBooks();
  }, [books]);

  // Add a book to the list
  const addBook = () => {
    if (!bookName.trim() || !notionUrl.trim()) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    const newBook: Book = { name: bookName.trim(), url: notionUrl.trim() };
    setBooks([...books, newBook]);
    setBookName('');
    setNotionUrl('');
  };

  // Remove a book from the list
  const deleteBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
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
        <Button title="Add Book" onPress={addBook} />
      </ThemedView>

      {/* Book List Section */}
      <ThemedView style={styles.bookListContainer}>
        {books.length === 0 ? (
          <ThemedText style={styles.emptyMessage}>Please add a book to your bookshelf.</ThemedText>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item, index }) => (
              <ThemedView style={styles.bookItem}>
                <ThemedView>
                  <ThemedText style={styles.bookName}>{item.name}</ThemedText>
                  <ThemedText style={styles.bookUrl}>{item.url}</ThemedText>
                </ThemedView>
                <TouchableOpacity
                  onPress={() => deleteBook(index)}
                  style={styles.deleteButton}
                >
                  <ThemedText style={styles.deleteText}>Delete</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  addBookContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  bookListContainer: {
    flex: 1,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  bookName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookUrl: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
