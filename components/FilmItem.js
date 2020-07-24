import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Utils from '../Utils/Utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import filledHeart from "../assets/images/filledHeart.png"

const posterPath = "https://image.tmdb.org/t/p/w300";

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favoriteMovies,
    }
}

export default connect(mapStateToProps)(class FilmItem extends React.Component {

    constructor(props) {
        super(props);
    }

    _isLike = () => this.props["favoriteMovies"].filter(m => m.id === this.props.movie.item.id).length > 0;

    _drawHeart = () => <Image style={ styles.heart } source={ filledHeart } />

    render() {
        const movie = this.props.movie.item;
        const onClickMovie = this.props.onClickMovie;
        return <View style={ styles.main_container }>
            <TouchableOpacity onPress={ () => onClickMovie(movie.id) } >
                <Image style={ styles.image } source={ { uri: posterPath + movie.poster_path } } />
            </TouchableOpacity>
            <View style={ styles.content_container }>
                <View style={ styles.header_container }>
                    { this._isLike() ? this._drawHeart() : undefined }
                    <Text style={ styles.title_text }>{ movie.title }</Text>
                    <Text style={ styles.vote_text }>{ movie.vote_average }</Text>
                </View>
                <View style={ styles.description_container }>
                    <Text style={ styles.description_text } numberOfLines={ 6 }>{ movie.overview }</Text>
                </View>
                <View style={ styles.date_container }>
                    <Text style={ styles.date_text }>Sorti le { Utils.computeDate(movie.release_date) }</Text>
                </View>
            </View>
        </View>
    }
});

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    heart: {
        height: 25,
        width: 25,
    }
})