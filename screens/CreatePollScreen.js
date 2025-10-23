import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // NEW IMPORT

// Define standard categories
const POLL_CATEGORIES = [
  'All Categories', 
  'Cafeteria & Food', 
  'Campus Life', 
  'Academics', 
  'Sports & Fitness', 
  'Events & Culture', 
  'Miscellaneous'
];

export default function CreatePollScreen({ navigation, polls, setPolls, user }) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']); 
  const [category, setCategory] = useState(POLL_CATEGORIES[1]); // NEW STATE

  const addOption = () => {
    if (options.length >= 5) {
      Alert.alert('Limit reached', 'You can create up to 5 options only');
      return;
    }
    setOptions([...options, '']);
  };

  const updateOption = (text, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = text;
    setOptions(updatedOptions);
  };

  const createPoll = () => {
    if (!title.trim() || options.some(opt => !opt.trim())) {
      return Alert.alert('Error', 'Enter poll title and all options');
    }

    const newPoll = {
      id: polls.length + 1,
      title,
      options,
      votes: options.map(() => 0),
      creator: user,
      category, // ADDED: include category
      voters: [], // ADDED: initialize voters array for tracking
    };

    setPolls([...polls, newPoll]);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create New Poll</Text>
      
      <TextInput
        placeholder="Poll Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      
      {/* Category Picker UI */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {/* Skip "All Categories" in the creation screen */}
          {POLL_CATEGORIES.slice(1).map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      {/* End Category Picker */}

      {options.map((opt, index) => (
        <TextInput
          key={index}
          placeholder={`Option ${index + 1}`}
          value={opt}
          onChangeText={text => updateOption(text, index)}
          style={styles.input}
        />
      ))}

      <Button title="Add Option" onPress={addOption} />

      <View style={{ marginTop: 20 }}>
        <Button title="Create Poll" onPress={createPoll} color="#4CAF50" />
      </View>
    </ScrollView>
  );
}

// Simple styling to improve visibility
const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    input: { borderWidth: 1, borderColor: '#ccc', marginVertical: 5, padding: 10, borderRadius: 5 },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', marginVertical: 10, borderRadius: 5 },
    label: { fontSize: 12, color: '#666', paddingHorizontal: 10, paddingTop: 5 },
    picker: { height: 50 },
});
