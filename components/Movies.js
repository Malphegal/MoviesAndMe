import React from 'react'
import { View, TextInput, Button, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import TMDB from './API/TMDB_handler'
import Header from './Utils/Header'

export default class Movies extends React.Component {

	constructor(props) {
		super(props);
		this.textInput = "";
		this.page = 1;
		this.state = {
			movies: [],
			isLoading: false,
		};
	}

	async _onClickMovie(id){
		let movie = await TMDB.getMovieById(id);
		this.props.navigation.navigate("ShowMovie", { movie: movie });
	}

    _loadMovies(newList){
		let text = this.textInput.trim();
		if (text === "")
			return;
		this.page = newList ? 1 : this.page + 1;
		this.setState({ isLoading: true });
    	TMDB.findMovies(text, this.page).then(data => {
			this.setState({ movies: newList ? data.results : [...this.state.movies, ...data.results], isLoading: false });
		}); 
	}
	
	//#region render

	_loadingScreen(){
		if (this.state.isLoading)
			return <View style={ styles.loading_container }>
				<ActivityIndicator size='large' />
			</View>
		return undefined;
	}
  
	_header(){
		return <Header title="Geges movies" />
	}

	_form(){
		return <>
			<TextInput placeholder='Titre du film' style={ styles.textinput } onChangeText={ (text) => this.textInput = text } onSubmitEditing={ (e) => { this._loadMovies(true); } } />
            <Button title='Rechercher' onPress={() => this._loadMovies(true) } />
		</>
	}

	_flatList(){
		return <FlatList data={ this.state.movies } keyExtractor={ (m) => m.id.toString() } renderItem={ (m) => <FilmItem movie={ m } onClickMovie={ this._onClickMovie.bind(this) } /> } onEndReachedThreshold={ 0.1 } onEndReached={ this._loadMovies.bind(this, false) } />
	}
	
	//#endregion

    render(){
        return <View style={ styles.main_container }>
			{ this._header() }
            { this._form() }
            { this._flatList() }
			{ this._loadingScreen() }
        </View>
    }
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		marginTop: 2,
	},
	textinput: {
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
		height: 50,
		borderColor: '#000000',
		borderWidth: 1,
		paddingLeft: 5
	},
	loading_container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 100,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
