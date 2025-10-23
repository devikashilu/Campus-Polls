import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LinearGradient } from 'react-native';

export default function PollCard({ poll, navigation }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{poll.title}</Text>

      <View style={styles.metaContainer}>
        <Text style={[styles.categoryBadge, { backgroundColor: categoryColor(poll.category) }]}>
          {poll.category}
        </Text>
        <Text style={styles.creatorText}>By: {poll.creator}</Text>
        <Text style={poll.status === 'Closed' ? styles.closedStatus : styles.activeStatus}>
          {poll.status}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PollDetail', { pollId: poll.id })}
      >
        <Text style={styles.buttonText}>View / Vote</Text>
      </TouchableOpacity>
    </View>
  );
}

// Helper function to color-code categories
const categoryColor = (category) => {
  switch (category) {
    case 'Food':
      return '#FF8C00';
    case 'Events':
      return '#9C27B0';
    case 'Sports':
      return '#4CAF50';
    case 'Academics':
      return '#2196F3';
    default:
      return '#007bff';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9ff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    fontSize: 13,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
    fontWeight: '600',
  },
  creatorText: {
    fontSize: 13,
    color: '#666',
  },
  activeStatus: {
    fontSize: 13,
    color: '#00C853',
    fontWeight: '700',
  },
  closedStatus: {
    fontSize: 13,
    color: '#D50000',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#0066FF',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    shadowColor: '#0066FF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15,
  },
});
