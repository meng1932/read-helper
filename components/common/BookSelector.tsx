import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, TABS, TABS_FORM_STORAGE_KEY_MAP } from '@/types';
import { ThemedView } from '../ui/ThemedView';


export interface IBookSelector {
    tab: TABS;
    onBookSelected?: (book: Book | null) => void; // Callback for selected book
}
const BookSelector = ({ tab }: IBookSelector) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const storageKey = TABS_FORM_STORAGE_KEY_MAP[tab]

    // Load books from AsyncStorage
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const bookshelf = await AsyncStorage.getItem('@bookshelf');
                if (bookshelf) {
                    setBooks(JSON.parse(bookshelf));
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to load books from storage.');
                console.error(error);
            }
        };

        loadBooks();
    }, []);

    // Handle dropdown selection
    const handleSelection = async (value: string) => {
        setSelectedValue(value);

        if (value === 'add-new-page') {
            createNewPage();
        } else {
            const selectedBook = books.find((book) => book.url === value);
            if (selectedBook) {
                try {
                    const form = await AsyncStorage.getItem(storageKey);
                    await AsyncStorage.setItem(storageKey, JSON.stringify({ ...JSON.parse(form || "{}"), notionPageId: selectedBook.url }));
                    Alert.alert('Success', 'Book URL saved successfully!');
                } catch (error) {
                    Alert.alert('Error', 'Failed to save book URL.');
                    console.error(error);
                }
            }
        }
    };

    // Placeholder for createNewPage function
    const createNewPage = () => {
        Alert.alert('Create New Page', 'Functionality to create a new page will be implemented.');
    };

    return (
        <ThemedView style={{ padding: 16 }}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={handleSelection}
                style={{ height: 50, width: '100%' }}
            >
                <Picker.Item label="Select a book" value="" />
                {books.map((book, index) => (
                    <Picker.Item key={index} label={book.name} value={book.url} />
                ))}
                <Picker.Item label="Add a new page" value="add-new-page" />
            </Picker>
        </ThemedView>
    );
};

export default BookSelector;