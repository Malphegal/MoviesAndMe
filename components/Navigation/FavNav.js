import React from 'react';
import Favs from '../Favs'
import Movie from '../Movie'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function TrackListNavigator() {
    return <Stack.Navigator initialRouteName="Favs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Favs" component={ Favs } />
        <Stack.Screen name="ShowMovieFav" component={ Movie } />
    </Stack.Navigator>
}