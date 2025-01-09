import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsPage = () => {
  const [notionApiKey, setNotionApiKey] = useState('');
  const [ocrApiKey, setOcrApiKey] = useState('');
  const [notionDatabaseId, setNotionDatabaseId] = useState('');

  useEffect(() => {
    // Load stored values when the page loads
    const loadSettings = async () => {
      try {
        const storedNotionApiKey = await AsyncStorage.getItem('NOTION_API_KEY');
        const storedOcrApiKey = await AsyncStorage.getItem('OCR_API_KEY');
        const storedDatabaseId = await AsyncStorage.getItem('NOTION_DATABASE_ID');

        if (storedNotionApiKey) setNotionApiKey(storedNotionApiKey);
        if (storedOcrApiKey) setOcrApiKey(storedOcrApiKey);
        if (storedDatabaseId) setNotionDatabaseId(storedDatabaseId);
      } catch (error) {
        Alert.alert('Error', 'Failed to load settings');
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('NOTION_API_KEY', notionApiKey);
      await AsyncStorage.setItem('OCR_API_KEY', ocrApiKey);
      await AsyncStorage.setItem('NOTION_DATABASE_ID', notionDatabaseId);
      Alert.alert('Success', 'Settings saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notion API Key</Text>
      <TextInput
        style={styles.input}
        value={notionApiKey}
        onChangeText={setNotionApiKey}
        placeholder="Enter your Notion API Key"
      />
      <Text style={styles.label}>OCR API Key</Text>
      <TextInput
        style={styles.input}
        value={ocrApiKey}
        onChangeText={setOcrApiKey}
        placeholder="Enter your OCR API Key"
      />
      <Text style={styles.label}>Notion Database ID</Text>
      <TextInput
        style={styles.input}
        value={notionDatabaseId}
        onChangeText={setNotionDatabaseId}
        placeholder="Enter your Notion Database ID"
      />
      <Button title="Save Settings" onPress={saveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 5, borderRadius: 5 },
});

export default SettingsPage;
