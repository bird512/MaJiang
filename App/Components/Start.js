'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,TouchableOpacity
} from 'react-native';
import ChoosePlayer from './ChoosePlayer';
import styles from '../Styles/style';
import Button from './Button';

export default class Start extends Component{
	constructor(props) {
        super(props);

        this.state = {
            id: 2,
        user: null,
        }
    }
     _pressButton() {
       
        console.log('---end _pressButton');
    }
    newGame(){
		var _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'ChoosePlayer',
                component: ChoosePlayer,
                params: {
                    id: this.state.id,
                    //从ChoosePlayer获取user
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
                    }
                }
            });
        }
    }
    render(){
         return(
            <View style={[styles.bg,styles.transparent]}>
                <Button onPress={this.newGame.bind(this)} text="New Game" />
                <Button onPress={this.newGame.bind(this)} text="History" />
                <Button onPress={this.newGame.bind(this)} text="Add User" />
            </View>
        );   	


    }
}

