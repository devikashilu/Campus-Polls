import React from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';

export default function PollDetailScreen({ route, navigation, polls, setPolls, user }) {
  const { pollId } = route.params; 
  const poll = polls.find(p => p.id === pollId);

  if (!poll) return <Text>Poll not found!</Text>;

  const totalVotes = poll.votes.reduce((sum, count) => sum + count, 0);
  const hasVoted = poll.voters.includes(user);
  const isCreator = poll.creator === user;
  const isClosed = poll.status === 'Closed'; // NEW CHECK

  const vote = (index) => {
    if (isClosed) {
        Alert.alert('Poll Closed', 'Voting is no longer active for this poll.');
        return;
    }
    if (hasVoted) {
      Alert.alert('Already Voted', 'You can only vote once per poll.');
      return;
    }

    const updatedPolls = polls.map(p => {
      if (p.id === pollId) {
        const newVotes = [...p.votes];
        newVotes[index] += 1;
        const newVoters = [...p.voters, user]; 

        return { ...p, votes: newVotes, voters: newVoters };
      }
      return p;
    });
    setPolls(updatedPolls);
    Alert.alert('Success', 'Your vote has been cast!');
  };

  // NEW FUNCTION: Close Poll (only for creator)
  const closePoll = () => {
    if (!isCreator) return;
    
    Alert.alert(
        "Confirm Close",
        "Are you sure you want to close this poll? No more votes will be allowed.",
        [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Close", 
                style: "destructive",
                onPress: () => {
                    const updatedPolls = polls.map(p => 
                        p.id === pollId ? { ...p, status: 'Closed' } : p
                    );
                    setPolls(updatedPolls);
                    Alert.alert('Poll Closed', 'The poll has been successfully closed.');
                }
            }
        ]
    );
  };

  // NEW FUNCTION: Delete Poll (only for creator)
  const deletePoll = () => {
    if (!isCreator) return;

    Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this poll? This cannot be undone.",
        [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Delete", 
                style: "destructive",
                onPress: () => {
                    const remainingPolls = polls.filter(p => p.id !== pollId);
                    setPolls(remainingPolls);
                    navigation.goBack();
                    Alert.alert('Poll Deleted', 'The poll has been removed.');
                }
            }
        ]
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <Text style={styles.title}>{poll.title}</Text>
            <Text style={styles.meta}>
                Category: {poll.category} | Created by: {poll.creator}
            </Text>
            <Text style={isClosed ? styles.closedStatus : styles.activeStatus}>
                Status: {poll.status}
            </Text>
            <Text style={styles.totalVotes}>Total Votes: {totalVotes}</Text>

            {poll.options.map((opt, i) => {
                const votes = poll.votes[i];
                const percentage = totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);

                return (
                    <View key={i} style={styles.optionContainer}>
                        {/* Vote Visualization Bar */}
                        <View style={styles.resultBar}>
                            <View 
                                style={{ 
                                    width: `${percentage}%`, 
                                    height: '100%', 
                                    backgroundColor: hasVoted && !isClosed ? '#4CAF50' : '#2196F3', // Highlight voted option
                                    opacity: isClosed ? 0.7 : 1, // Dim if closed
                                    borderRadius: 3
                                }} 
                            />
                            <Text style={styles.optionText}>
                                {opt} ({percentage}%)
                            </Text>
                        </View>
                        
                        <Button 
                            title={isClosed ? "Closed" : (hasVoted ? "Voted" : "Vote")} 
                            onPress={() => vote(i)} 
                            disabled={hasVoted || isClosed} // Disable button if voted or closed
                            color={hasVoted ? "gray" : "#007bff"}
                        />
                    </View>
                );
            })}

            {/* Creator Actions */}
            {isCreator && (
                <View style={styles.creatorActions}>
                    <Text style={styles.creatorHeader}>Creator Actions:</Text>
                    {!isClosed && (
                        <Button 
                            title="Close Poll" 
                            onPress={closePoll} 
                            color="#ff9800"
                        />
                    )}
                    <View style={{ marginTop: 10 }}>
                        <Button 
                            title="Delete Poll" 
                            onPress={deletePoll} 
                            color="#f44336"
                        />
                    </View>
                </View>
            )}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollView: { flex: 1 },
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
    meta: { fontSize: 14, color: 'gray', marginBottom: 10 },
    activeStatus: { fontSize: 16, color: 'green', fontWeight: 'bold', marginBottom: 10 },
    closedStatus: { fontSize: 16, color: 'red', fontWeight: 'bold', marginBottom: 10 },
    totalVotes: { fontSize: 16, fontWeight: '600', marginBottom: 15 },
    optionContainer: { marginVertical: 10, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
    resultBar: { height: 25, backgroundColor: '#eee', marginBottom: 5, borderRadius: 3, justifyContent: 'center' },
    optionText: { position: 'absolute', left: 5, color: '#333', fontWeight: 'bold' },
    creatorActions: { marginTop: 30, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#eee' },
    creatorHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});