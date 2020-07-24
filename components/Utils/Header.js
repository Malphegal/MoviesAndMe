import React from 'react'
import { View, StatusBar, Text } from 'react-native'

const HEADER_HEIGHT = 60;

export default class Header extends React.Component{

    static getHeaderHeight(){
        return HEADER_HEIGHT;
    }

    render(){
        let nav = this.props.navigation;
        let title = this.props.title;
        let fav = this.props.fav;
        return <View style={ styles.header }>
            { nav !== undefined ?
                <View style={ styles.buttonContainer }>
                    <Text onPress={ () => nav.goBack(fav ? "favoriteMovies" : null) } style={ styles.button }>&#60;</Text>
                </View>
            : undefined }
            <View style={ styles.textContainer }>
                <Text style={ styles.title }>{ title }</Text>
            </View>
        </View>
    }
}

const styles = {
    header: {
        height: HEADER_HEIGHT,
        paddingTop: StatusBar.currentHeight,
        marginBottom: -1,
        margin: 0,
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        margin: 2,
        textAlign: "center",
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5
    },
    textContainer: {
        flex: 10,
        height: 50
    },
    title: {
        marginLeft: 10,
        fontSize: 20,
    },
}