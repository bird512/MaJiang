import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,Picker,
  Navigator,TouchableOpacity,TouchableHighlight,Alert,ScrollView
} from 'react-native';


import styles from '../Styles/style';
import Button from './Button';
let sample = {
  host:1,
  winner:1,
  rate:1,
  chip:[0,0,0,0,1],
};
const BASE = 8;
const LOSEMAX = -40;
export default class Playing extends Component{

	  constructor(props) {
        super(props);
        this.state = {
            unpaidList:[],
            record: [],
            currentHost:4,
            isNoTaiFei:false
        }
    }
    hostBackup=[];//for onRevoke
    
    home(){
        console.log('go home');
    }
    onHeadPress(index){
      if(this.state.currentHost == 4){
        this.chooseHost(index);
      }else{
        this.chooseRate(index);
      }
    }
    chooseHost(hostIndex){
      let that = this;
      Alert.alert('选庄',
                    null,
                    [
                      {text: '选我庄', onPress: function(){
                        that.setState({currentHost:hostIndex});
                        that.hostBackup.push(hostIndex);
                      }},
                      {text: '取消', onPress: () => {}},
                    ]
                  );      
    }
    chooseRate(winerIndex){
      let that = this;
      Alert.alert('胡了',
                    null,
                    [
                      {text: '自摸', onPress: () => that.onRound(winerIndex,1)},
                      {text: '爆头，杠开，七对', onPress: () => that.onRound(winerIndex,2)},
                      {text: '飘，杠爆，七爆', onPress: () => that.onRound(winerIndex,4)},
                      {text: '双飘，飘杠爆，飘七爆', onPress: () => that.onRound(winerIndex,8)},
                      {text: '太大了说不出', onPress: () => that.onRound(winerIndex,16)},
                      {text: '取消', onPress: () => {}},
                    ]
                  );
    }
    onTaiPress(){
      let that = this;
      Alert.alert('台费',
                null,
                [
                  {text: '免台费', onPress: () => that.setState({isNoTaiFei:true})},
                  {text: '收台费', onPress: () => that.setState({isNoTaiFei:false})},
                ]
              );
    }
    onRound(winerIndex,rate){
      let {isNoTaiFei} = this.state;
      let isOldHost = winerIndex == this.state.currentHost? true:false;
      let chip = [];
      let {unpaidList} = this.state;
      for(let i = 0 ; i < 4; i++) {
        let num = 0;
        if(isOldHost){
          if(i == winerIndex){
            num = rate * BASE *3;
          }else{
            num = -rate * BASE;
          }
        }else{
          if(i == winerIndex){
            num = rate * BASE + rate * 2;
          }else if(i == this.state.currentHost){
            num = -rate * BASE;
          }else{
            num = - rate;
          }
        }
        chip.push(num);
      };
      unpaidList.push(chip);
      if(!isOldHost && !isNoTaiFei){//算台费
        //chip = [];
        let sums = [0,0,0,0];
        let taiFei = 0;
        unpaidList.map(function(item){
          sums[0]+=item[0];
          sums[1]+=item[1];
          sums[2]+=item[2];
          sums[3]+=item[3];
        });
        sums.map(function(sum,index){
          if(sum>=BASE){
            let thisTaiFei = Math.floor(sum/BASE);
            console.log('thisTaiFei = ',thisTaiFei);
            taiFei+= thisTaiFei;
            chip[index] = chip[index] - thisTaiFei;//扣台费
          }
        })
        chip.push(taiFei);
      }else{
        chip.push(0);
      }
      if(!isOldHost){
        unpaidList = [];
      }
      this.hostBackup.push(winerIndex)
      let d = {
        host:this.state.currentHost,
        winner:winerIndex,
        isOldHost:isOldHost,
        rate:rate,
        chip:chip
      };
      let {record} = this.state;
      record.push(d);
      this.setState({record,unpaidList,currentHost:winerIndex});
      this.checkEnd(isOldHost);
      
    }
    onRevoke(){
      let that = this;
      Alert.alert('回撤',
        null,
        [
          {text: '确定', onPress: function(){
            let {record,unpaidList} = that.state;
            record.pop();
            unpaidList.pop();
            //that.setState(record);
            that.hostBackup.pop();
            let lastHost = that.hostBackup[that.hostBackup.length-1];
            //if(!lastHost)lastHost = 4;
            //console.log('lastHost= ',lastHost);
            that.setState({record,unpaidList,currentHost:lastHost});
          }},
          {text: '取消', onPress: () => {}},
        ]
        );
      
    }
    checkEnd(isOldHost){
      let that = this;
      if(isOldHost){
        return;
      }
      let totalNums = [0,0,0,0,0];
      this.state.record.map(function(item,index){
        let row = item.chip.map(function(subItem,subIndex){
          totalNums[subIndex]+=subItem;
        })
      });
      let isLost = totalNums.find(function(item, index){
        if(item < LOSEMAX){
          let lostName = that.props.players[index].name;
 
          //let result = new Map();
          let result = {};
          that.props.players.map(function(player,pindex){
            result[player.name] = totalNums[pindex];
            //result.set(player.name,totalNums[pindex]);
          })
          result['台费'] = totalNums[4];
          that.props.checkout(result);
          Alert.alert(lostName + '爆了',
                      null,
                      [
                        {text: '继续', onPress: function(){
                          that.setState({
                              unpaidList:[],
                              record: [],
                              currentHost:4,
                          });
                        }},
                        {text: '换人/结束', onPress: () => that._back()},
                      ]);

          return true;
        }else{
          return false;
        }
      });
    }
    terminat(){
      let that = this;
      let totalNums = [0,0,0,0,0];
      let palyList = this.state.record.map(function(item,index){
        let row = item.chip.map(function(subItem,subIndex){
          totalNums[subIndex]+=subItem;
        })
      });      
      let result = {};
      that.props.players.map(function(player,pindex){
        result[player.name] = totalNums[pindex];
        //result.set(player.name,totalNums[pindex]);
      })
      result['台费'] = totalNums[4];
      that.props.checkout(result);
      Alert.alert('中止',
                  null,
                  [
                    {text: '继续', onPress: function(){
                      that.setState({
                          unpaidList:[],
                          record: [],
                          currentHost:4,
                      });
                    }},
                    {text: '换人/结束', onPress: () => that._back()},
                  ]);
    }
    _back(){
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
    }
    render(){
      let that = this;
    	let header = this.props.players.map(function(item,index){
        return (<TouchableHighlight style={styles.headitem}  key={item.name} onPress={that.onHeadPress.bind(that,index)} >
                  <Text>{item.name+(that.state.currentHost == index? "(庄)":"")}</Text>
                </TouchableHighlight>)
    	})
      header.push(<TouchableHighlight key='taiFei' style={styles.headitem} onPress={this.onTaiPress.bind(this)} ><Text>台费{this.state.isNoTaiFei?"(免)":""}</Text></TouchableHighlight>);
      //console.log('this.state.record = ',this.state.record);

      let totalNums = [0,0,0,0,0];
      let palyList = this.state.record.map(function(item,index){
        let row = item.chip.map(function(subItem,subIndex){
          totalNums[subIndex]+=subItem;
          return (
            <View style={styles.item} key={subIndex+'_num_'+subIndex}>
                  <Text >{subItem}</Text>
                </View>
            )
        })
        return (<View style={styles.row} key={'record_row_'+index}>
                  {row}
                </View>)
      });
      let totalItems = totalNums.map(function(t,totalIndex){
          return (
            <View style={styles.totalitem}  key={'total_'+totalIndex}>
                  <Text >{t}</Text>
            </View>
            )
      })
      let totalRow = (<View style={styles.row} >
                    {totalItems}
                  </View>
      );
      return (
        <View >
          <View style={styles.header}>
            {header}
          </View>
          <ScrollView >
            {palyList}

          </ScrollView>
            {totalRow}

          <View style={styles.row} >
            <Button text='中止' onPress={this.terminat.bind(this)}/>
            <Button text='回撤' onPress={this.onRevoke.bind(this)}/>
            <Button onPress={this._back.bind(this)} text='返回'/>
          </View>
        </View>
      )
    }
};



