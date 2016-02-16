import React, {Component,View,Text,TextInput,TouchableOpacity,ScrollView,StyleSheet} from 'react-native';
import styles from '../Styles/style';
import Button from './Button';
export default class AddPlayer extends Component{
  _setUserName(val){
    this.setState({
      username: val
    });
  }
  _addUser(){
    //check name

  }
  _back(){
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
  }

  render() {
    return (
        <ScrollView style={{paddingTop:30}}>
          <View style={styles.row}>
            <Text style={styles.label}>用户名</Text>
            <TextInput style={styles.input} onChangeText={this._setUserName.bind(this)}/>
          </View>
          <View style={{marginTop:30, alignItems:'center', justifyContent:'center'}}>
            
            <Button onPress={this._setUserName.bind(this)} text='创建用户'/>
            <Button onPress={this._back.bind(this)} text='返回'/>
          {/*
            <TouchableOpacity onPress={this._addUser.bind(this)}>
              <View style={styles.btn}>
                <Text>创建用户</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._back.bind(this)}>
              <View style={styles.btn}>
                <Text>返回</Text>
              </View>
            </TouchableOpacity>
            */}
          </View>
        </ScrollView>

    );
  }
}

