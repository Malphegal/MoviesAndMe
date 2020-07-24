import React from 'react';
import Upcoming from '../Upcoming'
import Movie from '../Movie'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function TrackListNavigator() {
    return <Stack.Navigator initialRouteName="Favs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Upcoming" component={ Upcoming } />
        <Stack.Screen name="ShowMovieUpcoming" component={ Movie } />
    </Stack.Navigator>
}