import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import PollCard from '../components/PollCard';

const POLL_CATEGORIES = [
  'All Categories',
  'Cafeteria & Food',
  'Campus Life',
  'Academics',
  'Sports & Fitness',
  'Events & Culture',
  'Miscellaneous',
];

export default function HomeScreen({ navigation, polls, setPolls, user }) {
  const [selectedCategory, setSelectedCategory] = useState(POLL_CATEGORIES[0]);
  const [sortBy, setSortBy] = useState('Newest');
  const [showMyPolls, setShowMyPolls] = useState(false);

  const filteredAndSortedPolls = useMemo(() => {
    let currentPolls = polls;

    // Filter: My Polls
    if (showMyPolls) {
      currentPolls = currentPolls.filter((poll) => poll.creator === user);
    }

    // Filter: Category
    if (selectedCategory !== 'All Categories') {
      currentPolls = currentPolls.filter((poll) => poll.category === selectedCategory);
    }

    // Sort
    return currentPolls.sort((a, b) => {
      if (sortBy === 'Most Voted') {
        const votesA = a.votes.reduce((sum, count) => sum + count, 0);
        const votesB = b.votes.reduce((sum, count) => sum + count, 0);
        return votesB - votesA;
      }
      return b.id - a.id; // Default: Newest
    });
  }, [polls, selectedCategory, sortBy, showMyPolls, user]);

  return (
    <LinearGradient colors={['#E0EAFC', '#CFDEF3']} style={styles.container}>
      <Text style={styles.header}>🎓 Campus Polls</Text>

      {/* Filter and Sort Controls */}
      <View style={styles.controlsContainer}>
        {/* Category Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.picker}
          >
            {POLL_CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        {/* Sort Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={sortBy}
            onValueChange={(value) => setSortBy(value)}
            style={styles.picker}
          >
            <Picker.Item label="Newest" value="Newest" />
            <Picker.Item label="Most Voted" value="Most Voted" />
          </Picker>
        </View>
      </View>

      {/* My Polls Switch */}
      <View style={styles.myPollsContainer}>
        <Text style={styles.myPollsText}>Show My Polls ({user})</Text>
        <Switch
          onValueChange={setShowMyPolls}
          value={showMyPolls}
          thumbColor={showMyPolls ? '#007BFF' : '#ccc'}
          trackColor={{ true: '#A6C8FF', false: '#ddd' }}
        />
      </View>

      {/* Poll List */}
      <FlatList
        data={filteredAndSortedPolls}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PollCard poll={item} navigation={navigation} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Poll Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreatePoll')}
      >
        <Text style={styles.createButtonText}>+ Create New Poll</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 26,
    marginBottom: 15,
    fontWeight: '800',
    color: '#2C3E50',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
  },
  picker: {
    height: 45,
  },
  myPollsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#F5F9FF',
  },
  myPollsText: {
    fontSize: 16,
    color: '#333',
  },
  createButton: {
    backgroundColor: '#007BFF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#007BFF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
