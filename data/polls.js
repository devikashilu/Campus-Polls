export default [
  {
    id: 1,
    title: 'Favorite Cafeteria Dish?',
    options: ['Pizza', 'Burger', 'Pasta'],
    votes: [3, 2, 1],
    creator: 'StudentA',
    category: 'Cafeteria & Food', // ADDED
    voters: ['StudentX', 'StudentY', 'StudentZ'], // ADDED for single-vote tracking
    status: 'Active' // ADDED
  },
  {
    id: 2,
    title: 'Best Hangout Spot?',
    options: ['Library', 'Canteen', 'Playground'],
    votes: [1, 4, 2],
    creator: 'StudentB',
    category: 'Campus Life', // ADDED
    voters: ['StudentA', 'StudentX', 'StudentY', 'StudentZ'], // ADDED
    status: 'Active' // ADDED
  },
  {
    id: 3,
    title: 'Preferred Study Time?',
    options: ['Morning', 'Afternoon', 'Evening', 'Night'],
    votes: [2, 3, 1, 0],
    creator: 'StudentC',
    category: 'Academics', // ADDED
    voters: ['StudentX', 'StudentY', 'StudentZ'], // ADDED
    status: 'Active' // ADDED
  },
  {
    id: 4,
    title: 'Favorite Campus Event?',
    options: ['Sports Day', 'Cultural Fest', 'Tech Expo'],
    votes: [5, 2, 3],
    creator: 'StudentD',
    category: 'Events & Culture', // ADDED
    voters: ['StudentX', 'StudentY', 'StudentZ'], // ADDED
    status: 'Active' // ADDED
  },
];
