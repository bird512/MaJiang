import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,TouchableOpacity,TouchableHighlight
} from 'react-native';


import styles from '../Styles/style';
export default class ControlPanel extends Component{

	constructor(props) {
        super(props);
        this.state = {
            record: []
        }
    }
    home(){
        console.log('go home');
    }
    render(){
    	let header = this.props.players.map(function(item){

    	})
        return (
            <View style={styles.sidebar}>
                <TouchableHighlight 
                    style={styles.link}
                    underlayColor="rgba(50, 105, 69, 0.4)"
                    onPress={this.home}>
                    <Text style={styles.linkText}> Home </Text>
                </TouchableHighlight>
                 <TouchableHighlight 
                    style={styles.link}
                    underlayColor="rgba(50, 105, 69, 0.4)"
                    onPress={this.account}>
                    <Text style={styles.linkText}> Accounts </Text>
                </TouchableHighlight>
            
            </View>
        )
    }
}

