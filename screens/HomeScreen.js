import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import PollCard from '../components/PollCard';

const POLL_CATEGORIES = [
  'All Categories', 
  'Cafeteria & Food', 
  'Campus Life', 
  'Academics', 
  'Sports & Fitness', 
  'Events & Culture', 
  'Miscellaneous'
];

export default function HomeScreen({ navigation, polls, setPolls, user }) {
  const [selectedCategory, setSelectedCategory] = useState(POLL_CATEGORIES[0]);
  const [sortBy, setSortBy] = useState('Newest'); // New sort state
  const [showMyPolls, setShowMyPolls] = useState(false); // New filter state

  const filteredAndSortedPolls = useMemo(() => {
    let currentPolls = polls;

    // 1. Filter by My Polls
    if (showMyPolls) {
        currentPolls = currentPolls.filter(poll => poll.creator === user);
    }

    // 2. Filter by Category
    if (selectedCategory !== 'All Categories') {
      currentPolls = currentPolls.filter(poll => poll.category === selectedCategory);
    }

    // 3. Sort
    return currentPolls.sort((a, b) => {
        if (sortBy === 'Most Voted') {
            const votesA = a.votes.reduce((sum, count) => sum + count, 0);
            const votesB = b.votes.reduce((sum, count) => sum + count, 0);
            return votesB - votesA; // Descending
        }
        // Default: Newest (highest ID)
        return b.id - a.id;
    });
  }, [polls, selectedCategory, sortBy, showMyPolls, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Campus Polls</Text>

      {/* Filter and Sort Controls */}
      <View style={styles.controlsContainer}>
        {/* Category Filter */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            {POLL_CATEGORIES.map(cat => (
                <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        {/* Sort By */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={sortBy}
            onValueChange={(itemValue) => setSortBy(itemValue)}
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
          />
      </View>
      
      <FlatList
        data={filteredAndSortedPolls}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PollCard poll={item} navigation={navigation} />
        )}
      />

      <Button
        title="Create New Poll"
        onPress={() => navigation.navigate('CreatePoll')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
    controlsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, flex: 1, marginHorizontal: 5 },
    picker: { height: 50 },
    myPollsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: 5, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
    myPollsText: { fontSize: 16 }
});