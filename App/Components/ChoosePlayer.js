import React,{
    View,
    Text,
    TouchableOpacity,Alert
} from 'react-native';

import Button from './Button';
import Players from './utils/Players';
import Playing from './Playing';
import styles from '../Styles/style';

export default class ChoosePlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players:[],
            id: null
        }
    }

    componentDidMount() {
        //这里获取从Start传递过来的参数: id
        this.setState({
            id: this.props.id
        });
        this.setState({players:Players})
    }

    _pressButton() {
        const { navigator } = this.props;
            
        if(navigator) {
            navigator.pop();
        }
    }
    startGame(){
        let selectedPlayers = players.filter((n) => n.selected == true); 
        if(selectedPlayers.length != 4){
            Alert.alert('Must select 4 Players');
            return;
        }
        var _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Playing',
                component: Playing,
                params: {
                    id: this.state.id,
                    players: selectedPlayers
                }
            });
        }
    }

    _select(item){
        let selected = item.selected;
        let {players} = this.state;
        let selectedPlayers = players.filter((n) => n.selected == true);

        if(selected){
            item.selected = false;
        }else{
            if(selectedPlayers.length < 4){
                item.selected = true;
            }else{
                //already have 4 players
                //do nothing
            }
        }
        this.setState(players);
    }
    render() {
        let that = this;
        let items = this.state.players.map(function(item){
            let selectedStyle = item.selected? styles.playerselected:styles.palyerunselected;
            return(<TouchableOpacity key={item.name} onPress={that._select.bind(that, item)}>
              <View style={[styles.headitem, selectedStyle]}>
                <Text style={selectedStyle}>{item.name} </Text>
              </View>
            </TouchableOpacity>);
                        
        }); 
        return(
            <View>
                <View style={styles.playerspanel}>
                {items}
                </View>
                <Button text='Start' onPress={this.startGame.bind(this)}/>
                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text>点我跳回去</Text>
                </TouchableOpacity>
            </View>
        );
    }
}