import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PollCard({ poll, navigation }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{poll.title}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.categoryBadge}>{poll.category}</Text>
        <Text style={styles.creatorText}>By: {poll.creator}</Text>
        <Text style={poll.status === 'Closed' ? styles.closedStatus : styles.activeStatus}>
            {poll.status}
        </Text>
      </View>
      <Button
        title="View / Vote"
        onPress={() => navigation.navigate('PollDetail', { pollId: poll.id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    card: { 
        borderWidth: 1, 
        borderColor: '#ddd',
        padding: 15, 
        marginBottom: 10, 
        borderRadius: 8 
    },
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 5 
    },
    metaContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 10
    },
    categoryBadge: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#007bff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    creatorText: { 
        fontSize: 12, 
        color: 'gray' 
    },
    activeStatus: {
        fontSize: 12,
        color: 'green',
        fontWeight: 'bold'
    },
    closedStatus: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold'
    }
});