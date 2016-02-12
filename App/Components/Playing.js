import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,TouchableOpacity,TouchableHighlight,Alert
} from 'react-native';


import styles from '../Styles/style';
import Button from './Button';
let sample = {
  host:1,
  winner:1,
  isOldHost:true,
  rate:1,
  chip:[0,0,0,0,1],
};
const BASE = 8;
export default class Playing extends Component{

	  constructor(props) {
        super(props);
        this.state = {
            unpaidList:[],
            record: [],
            currentHost:4
        }
    }
    home(){
        console.log('go home');
    }
    chooseRate(){
      console.log('--------------chooseRate');
      Alert.alert('Alert Title',
                    null,
                    [
                      {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
                      {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
                      {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
                    ]
                  );
    }
    onRound(winerIndex,rate){
      let isOldHost = winerIndex == this.state.currentHost? true:false;
      let chip = [];
      for(let i = 0 ; i <= 5; i++) {
        let num = 0;
        if(isOldHost){
          if(i == winerIndex){
            num = rate * BASE *3;
          }else{
            num = -rate * BASE;
          }
        }else{
          if(i == winerIndex){
            num = rate * BASE + rate;
          }else if(i == this.state.currentHost){
            num = -rate * BASE;
          }else{
            num = - rate;
          }
        }
        chip.push(num);
      };
      unpaidList.push(chip);
      if(!isOldHost){
        chip = [];
        let sums = [0,0,0,0];
        let taiFei = 0;
        unpaidList.map(function(item){
          sums[0]+=item[0];
          sums[1]+=item[1];
          sums[2]+=item[2];
          sums[3]+=item[3];
        });
        sums.map(function(sum){
          if(sum>BASE){
            taiFei+=sum/8;
            sum = sum - sum/8;
            chip.push(sum);
          }
        })
        chip.push(taiFei);
      }else{
        chip.push(0);
        //do nothing
      }
      let d = {
        host:this.state.currentHost,
        winner:winerIndex,
        isOldHost:isOldHost,
        rate:rate,
        chip:chip
      };
      this.state.record.push(d);
    }
    onRevoke(){
      this.state.record.pop();
    }
    isEnd(){
      let palyer0=0;
      let palyer1=0;
      let palyer2=0;
      let palyer3=0;
      this.state.record.map(function(item){
        let chip = item.chip;

        chip.map(function(chipItem){
          palyer0+= chipItem[0];
          palyer1+= chipItem[1];
          palyer2+= chipItem[2];
          palyer3+= chipItem[3];

        });
      })
    }

    render(){
    	let header = this.props.players.map(function(item){
          return (<TouchableHighlight style={styles.item} onPress={this.home.bind(this)} >
                    <Text>{item.name}</Text>
                  </TouchableHighlight>)
    	})
      header.push(<View style={styles.item}><Text>TAI</Text></View>);

      let palyList = this.state.record.map(function(item){
            <View >
              <Text >{item}</Text>
            </View>
      });
      return (
          <View style={styles.header}>
            {header}
            {palyList}
          </View>
      )
    }
};



