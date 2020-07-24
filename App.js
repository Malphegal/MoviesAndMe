import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Upcoming from './components/Navigation/UpcomingNav'
import Movies from './components/Navigation/MoviesNav'
import Favs from './components/Navigation/FavNav'
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
const homeIcon = require('./assets/images/home.png')
const searchIcon = require('./assets/images/search.png')
const favIcon = require('./assets/images/filledHeart.png')

const Tab = createBottomTabNavigator();

import TAB_HEIGHT from './components/Utils/BottomTab'

export default class App extends React.Component {
	render() {
		return <Provider store={Store}>
			<NavigationContainer>
				<Tab.Navigator initialRouteName='Movies' tabBarOptions={{ style: { height: TAB_HEIGHT }, activeBackgroundColor: '#ccc', inactiveBackgroundColor: '#eee', showLabel: false }} >
					<Tab.Screen name='Upcoming' component={ Upcoming } options={{ tabBarIcon: () => <Image style={ styles.icon } source={ homeIcon } /> }} />
					<Tab.Screen name='SearchMovies' component={ Movies } options={{ tabBarIcon: () => <Image style={ styles.icon } source={ searchIcon } /> }} />
					<Tab.Screen name='Favs' component={ Favs } options={{ tabBarIcon: () => <Image style={ styles.icon } source={ favIcon } /> }} />
				</Tab.Navigator>
			</NavigationContainer>
	  	</Provider>
	}
}

const styles = StyleSheet.create({
    icon: {
		width: 40,
		height: 40,
	}
})