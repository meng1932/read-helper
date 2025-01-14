import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book, TABS, TABS_FORM_STORAGE_KEY_MAP } from '@/types';
import { useAsyncStorageGet, useAsyncStorageUpdate } from '@/hooks/useAsyncStorage';

export interface IBookSelector {
    tab: TABS;
    onBookSelected?: (book: Book | null) => void; // Callback for selected book
}

const BookSelector = ({ tab }: IBookSelector) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    const { data: bookshelf, loading, error: getBookshelfError } = useAsyncStorageGet<Book[]>('@bookshelf');
    const { updateData: updateStorage, error: updateBookshelfError } = useAsyncStorageUpdate();

    if (getBookshelfError || updateBookshelfError) console.log(getBookshelfError || updateBookshelfError);

    // Load books from AsyncStorage
    useEffect(() => {
        if (bookshelf) {
            setBooks(bookshelf);
        }
    }, [bookshelf]);

    // Handle card selection
    const handleSelection = async (book: Book) => {
        setSelectedBook(book.url);
        updateStorage(TABS_FORM_STORAGE_KEY_MAP[tab], { notionPageId: book.url });
    };

    return (loading ? <ActivityIndicator /> :
        <View style={styles.container}>
            {books.length === 0 ? (
                <Text style={styles.emptyText}>Please add books to your bookshelf.</Text>
            ) : (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.url}
                    numColumns={2}
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
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
    card: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCard: {
        backgroundColor: '#cce5ff',
        borderColor: '#007bff',
        borderWidth: 2,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookSelector;
