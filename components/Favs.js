import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import FilmItem from './FilmItem'
import TMDB from './API/TMDB_handler'
import Header from './Utils/Header'

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favoriteMovies,
    }
}

export default connect(mapStateToProps)(class Favorites extends React.Component {
    
    _header(){
        return <Header title="Favoris" fav={ true } />
    }

	async _onClickMovie(id){
		let movie = await TMDB.getMovieById(id);
		this.props.navigation.navigate("ShowMovieFav", { movie: movie });
	}

    render() {
        return <>
            { this._header() }
            <FlatList data={ this.props["favoriteMovies"] } keyExtractor={ (m) => m.id.toString() } renderItem={ (m) => <FilmItem movie={ m } onClickMovie={ this._onClickMovie.bind(this) } /> } />
        </>
    }
});

const styles = StyleSheet.create({

})