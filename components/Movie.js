import React, { useRef } from 'react'
import { StyleSheet, View, Image, Text, Dimensions, Animated, FlatList, TouchableOpacity } from 'react-native'
import Utils from '../Utils/Utils'
import Header from './Utils/Header'
import BottomTabHeight from './Utils/BottomTab'
import { connect } from 'react-redux'
import filledHeart from "../assets/images/filledHeart.png"
import emptyHeart from "../assets/images/emptyHeart.png"
import FT from "../store/favType"
import TAB_HEIGHT from './Utils/BottomTab'
import PersonInfo from './Credits/PersonInfo'

const posterPath = "https://image.tmdb.org/t/p/w500";

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favoriteMovies,
    }
}

export default connect(mapStateToProps)(class Movie extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            scrolled: false,
            castExpanded: false,
        };
    }

    _toggleFavorite() {
        const action = { type: FT.like, value: this.props.route.params['movie'] };
        this.props.dispatch(action);
    }

    _heartPath = () => this.props["favoriteMovies"].filter(m => m.id === this.props.route.params["movie"].id).length > 0
        ? filledHeart : emptyHeart;

    _drawLike(){
        return <TouchableOpacity style={ styles.heart } onPress={ this._toggleFavorite.bind(this) }>
            <Image source={ this._heartPath() } />
        </TouchableOpacity>
    }

    /* ---- Render ---- */

    header(movie){
        return <>
            { this.image(movie.poster_path)}
            { this.description(movie) }
            { !this.state.castExpanded ? this.expandButton() : undefined }
        </>
    }

    image(path){
        return <View style={ styles.flex1 }>
            <Image style={ styles.image } source={ { uri: posterPath + path } } />
            
            { !this.state.scrolled ?
                <FadeInView style={ styles.downArrowContainer }>
                    <Text style={ styles.downArrow }>&#8681;</Text>
                </FadeInView>
                : undefined }
        </View>
    }

    onScroll(){
        if (!this.state.scrolled)
            this.setState({ scrolled: true });
    }

    onPressShowCast(){
        if (!this.state.castExpanded)
            this.setState({ castExpanded: true });
    }

    description(movie){
        return <View style= { styles.text_container }>
            <View style={ styles.header }>
                { this._drawLike() }
                <Text style={ styles.title_text}>{ movie.title }</Text>
            </View>
            <Text style={ styles.description_text}>{ movie.overview }</Text>
            <Text style={ styles.default_text }>Sorti le { Utils.computeDate(movie.release_date) }</Text>
            <Text style={ styles.default_text }>Note : { movie.vote_average } / 10</Text>
            <Text style={ styles.default_text }>Nombre de votes : { Utils.thousandSeparator(movie.vote_count) }</Text>
            <Text style={ styles.default_text }>Budget : { Utils.thousandSeparator(movie.budget) } $</Text>
            <Text style={ styles.default_text }>Genre(s) : { movie.genres.map((genre) => genre.name).join(" / ") }
            </Text>
            <Text style={ styles.default_text }>Companie(s) : { movie.production_companies.map((company) => company.name).join(" / ") }
            </Text>
        </View>
    }

    creditsData(credits){
        let cast = credits.cast;
        //let crew = credits.crew;
        return this.state.castExpanded ? cast : undefined;
    }

    expandButton(){
        return <TouchableOpacity style={ styles.expendContainer } onPress={ this.onPressShowCast.bind(this) } >
            <Text style={ styles.expandButton }>Afficher les acteurs</Text>
        </TouchableOpacity>
    }

    render() {
        let movie = this.props.route.params.movie;
        return (
            <View style={ styles.flex1 }>
                <Header title={ movie.title } navigation={ this.props.navigation } />
                <View style={ styles.cast }>
                    <FlatList numColumns={ 3 } ListHeaderComponent={ this.header(movie) } onScrollBeginDrag={ this.onScroll.bind(this) } 
                        data={ this.creditsData(movie.credits) } renderItem={ (m) => this.state.castExpanded ? <PersonInfo char={ m } /> : undefined } />
                </View>
            </View>
        );
    }
});

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const fadeAnimBottom = useRef(new Animated.Value(-200)).current
  
    React.useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, delay: 100, useNativeDriver: true, }).start();
    }, [fadeAnim]);

    React.useEffect(() => {
        Animated.timing(fadeAnimBottom, { toValue: 0, duration: 1000, useNativeDriver: true, }).start();
    }, [fadeAnimBottom]);
  
    return (
        <Animated.View style={{ ...props.style, opacity: fadeAnim, transform: [ { translateY: fadeAnimBottom } ] }}>
            {props.children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row"
    },
    flex1: {
        flex: 1
    },
    image: {
        height: Dimensions.get('window').height - Header.getHeaderHeight() + 1 - TAB_HEIGHT,
        width: Dimensions.get('window').width,
        resizeMode: "cover"
    },
    title_text: {
        fontWeight: "bold",
        fontSize: 35,
        flex: 5,
        flexWrap: "wrap",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: "#000000",
        textAlign: "center"
    },
    description_text: {
        fontStyle: "italic",
        color: "#666666",
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    downArrow: {
        position: "absolute",
        textAlign: "center",
        color: "white",
        bottom: 0,
        left: 0,
        right: 0,
        fontSize: 60
    },
	heart: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    cast: {
        flexDirection: "column",
        marginBottom: BottomTabHeight + 10
    },
    expendContainer: {
        flex: 1,
        padding: 10,
    },
    expandButton: {
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#538DBB",
        color: "white",
        textAlign: "center",
        alignSelf: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8
    }
})