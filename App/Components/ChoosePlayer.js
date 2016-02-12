import React,{
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import Button from './Button';
import Players from './utils/Players';
import Playing from './Playing';
export default class ChoosePlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }

    componentDidMount() {
        //这里获取从Start传递过来的参数: id
        this.setState({
            id: this.props.id
        });
    }

    _pressButton() {
        const { navigator } = this.props;
            
        if(navigator) {
            navigator.pop();
        }
    }
    startGame(){
        var _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Playing',
                component: Playing,
                params: {
                    id: this.state.id,
                    players: Players
                }
            });
        }
    }
    render() {
        let items = Players.map(function(item){
            return <Button text={item.name}/>
        })
        return(
            <View>
                {items}
                <Button text='Start' onPress={this.startGame.bind(this)}/>
                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text>点我跳回去</Text>
                </TouchableOpacity>
            </View>
        );
    }
}