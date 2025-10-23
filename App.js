import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CreatePollScreen from './screens/CreatePollScreen';
import PollDetailScreen from './screens/PollDetailScreen';
import pollsData from './data/polls';

const Stack = createNativeStackNavigator();

export default function App() {
  const [polls, setPolls] = useState(pollsData);
  const user = "StudentA"; // Mock user

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        
        {/* HomeScreen receives polls and setPolls as props */}
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} polls={polls} setPolls={setPolls} />}
        </Stack.Screen>

        {/* CreatePollScreen receives polls, setPolls, and user */}
        <Stack.Screen name="CreatePoll">
          {props => <CreatePollScreen {...props} polls={polls} setPolls={setPolls} user={user} />}
        </Stack.Screen>

        {/* PollDetailScreen receives polls, setPolls, and user */}
        <Stack.Screen name="PollDetail">
          {props => <PollDetailScreen {...props} polls={polls} setPolls={setPolls} user={user} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


