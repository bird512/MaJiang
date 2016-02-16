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
            records:[],
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

    _back() {
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
        var that = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Playing',
                component: Playing,
                params: {
                    id: this.state.id,
                    players: selectedPlayers,
                    checkout: function(record) {
                        let {players} = that.state;
                        let selectedPlayers = players.filter((n) => n.selected == true);
                        selectedPlayers.map(function(palyer,index){
                            let name = palyer.name;

                        })
                        let {records} = that.state;
                        records.push(record);
                        that.setState(records);
                        console.log('records = ',records);
                    }
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
        let totalMap = {};
        this.state.records.map(function(item,index){
            Object.keys(item).map(function(key){
                let tempTotal = item[key];
                if(totalMap[key]){
                    tempTotal += totalMap[key];
                }    
              totalMap[key]=tempTotal;            
            })
            /*
            for (let key of item.keys()) {
                let tempTotal = item.get(key);
                if(totalMap.has(key)){
                    tempTotal += total.get(key);
                }    
              totalMap.set(key,tempTotal)
            }
            */
        });
        let totalHeader = Object.keys(totalMap).map(function(item,index){
            return(
                    <View style={styles.totalitem} >
                      <Text >{item}</Text>
                    </View>
                )
        });
       let totalValues = Object.keys(totalMap).map(function(item,index){
            return(
                    <View style={styles.totalitem} >
                      <Text >{totalMap[item]}</Text>
                    </View>
                )
        });
        let recordValues = this.state.records.map(function(record){
            let recordRow =  Object.keys(totalMap).map(function(key,index){
                return(
                        <View style={styles.totalitem} >
                          <Text >{record[key]}</Text>
                        </View>
                    )
            });
            return (<View style={styles.row} >{recordRow}</View>);
        })      
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
                <View style={styles.row} >{totalHeader}</View>
                {recordValues}
                <View style={styles.row} >
                    <Button text='开始' onPress={this.startGame.bind(this)}/>
                    <Button onPress={this._back.bind(this)} text='返回'/>
                </View>
                <View style={styles.row} >{totalValues}</View>
            </View>
        );
    }
}