import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { Ionicons } from '@expo/vector-icons'; // Assuming Expo environment

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
  const [category, setCategory] = useState(POLL_CATEGORIES[1]);

  const addOption = () => {
    if (options.length >= 5) {
      Alert.alert('Limit reached', 'You can create up to 5 options only');
      return;
    }
    setOptions([...options, '']);
  };

  // NEW FUNCTION: Remove an option
  const removeOption = (indexToRemove) => {
    if (options.length <= 2) {
      Alert.alert('Minimum Options', 'A poll must have at least two options.');
      return;
    }
    setOptions(options.filter((_, index) => index !== indexToRemove));
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
      category,
      voters: [],
      status: 'Active', // Initial status
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
      
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {POLL_CATEGORIES.slice(1).map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.optionsHeader}>Poll Options:</Text>
      
      {options.map((opt, index) => (
        <View key={index} style={styles.optionInputRow}>
          <TextInput
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChangeText={text => updateOption(text, index)}
            style={styles.optionInput}
          />
          {options.length > 2 && ( // Only show remove button if > 2 options
             <TouchableOpacity onPress={() => removeOption(index)} style={styles.removeButton}>
                <Ionicons name="close-circle" size={24} color="red" />
             </TouchableOpacity>
          )}
        </View>
      ))}

      <Button title="Add Option" onPress={addOption} />

      <View style={styles.createButtonContainer}>
        <Button title="Create Poll" onPress={createPoll} color="#4CAF50" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    input: { borderWidth: 1, borderColor: '#ccc', marginVertical: 5, padding: 10, borderRadius: 5 },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', marginVertical: 10, borderRadius: 5 },
    label: { fontSize: 12, color: '#666', paddingHorizontal: 10, paddingTop: 5 },
    picker: { height: 50 },
    optionsHeader: { fontSize: 16, fontWeight: '600', marginTop: 10, marginBottom: 5 },
    optionInputRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    optionInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, flex: 1, marginRight: 10 },
    removeButton: { padding: 5 },
    createButtonContainer: { marginTop: 20 }
});