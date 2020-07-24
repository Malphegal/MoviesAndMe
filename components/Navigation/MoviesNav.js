import React from 'react';
import Movies from '../Movies'
import Movie from '../Movie'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function TrackListNavigator() {
    return <Stack.Navigator initialRouteName="Movies" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Movies" component={ Movies } />
        <Stack.Screen name="ShowMovie" component={ Movie } />
    </Stack.Navigator>
}