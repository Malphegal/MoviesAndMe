import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

const profilePath = "https://image.tmdb.org/t/p/w185";
const defaultAvatarPath_man = require("../../assets/images/avatar_man.png")
const defaultAvatarPath_woman = require("../../assets/images/avatar_woman.png")

export default class CastInfo extends React.Component{

    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            src: defaultAvatarPath_man,
        };
    }

    componentDidMount(){
        this._isMounted = true;
        let url = this.props.char.item.profile_path;
        if (!url)
            return;
        url = profilePath + url;
        fetch(url).then(res => {
            if(this._isMounted && res.status == 200)
                this.setState({ src: { uri: url }, date: Date.now() })
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handlerName(name){
        let option = /\(([^)]+)\)/.exec(name);
        let split = name.split('(');
        if (option)
            return [split[0], option[1]];
        return [split[0], undefined];
    }

    option(value){
        switch (value) {
            case "voice":
                return <Image style={ styles.option } source={ require('../../assets/images/micro.png') } />;
        
            default:
                break;
        }
    }

    render(){
        let width = Dimensions.get('window').width;
        let char = this.props.char.item;
        let [charName, charNameOption] = this.handlerName(char.character);
        return <View style={ { padding: 10, width: width / 3, height: width / 2 } } >
            <Image key={ this.state.date } style={ styles.image } source={ this.state.src } />
            <Text style={ styles.texts }>{ char.name } - <Text style={ styles.charName }>{ charName }{ this.option(charNameOption) }</Text></Text>
        </View>
    }
}

const styles = {
    image: {
        flex:1,
        width: undefined,
        height: undefined,
        resizeMode: "contain"
    },
    texts: {
        textAlign: "center"
    },
    charName: {
        color: "#888"
    },
    option: {
        width: 20,
        height: 20
    }
}