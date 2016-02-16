'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Drawer from 'react-native-drawer';
import Start from './Start';
import styles from '../Styles/style';
import ControlPanel from './ControlPanel';

export default class App extends Component{
    render() {
        var defaultName = 'Start';
        var defaultComponent = Start;
        return (
        <Drawer
                ref="drawer"
                type="overlay"
                openDrawerOffset={50} 
                panCloseMask={1} 
                styles={{
                    drawer: {
                        shadowColor: "#000000",
                        shadowOpacity: 0.8,
                        shadowRadius: 0,                    
                        backgroundColor: '#7ACECC'
                    }
                }}
                tweenHandler={(ratio) => {
                    return {
                        drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
                        main: { opacity:(2-ratio)/2 },
                    }
                }}
                content={ <ControlPanel />}
               
                >                
                <View style={[styles.bg,styles.container]}> 
			        <Navigator
			          initialRoute={{ name: defaultName, component: defaultComponent }}
			          configureScene={(route) => {
			            return Navigator.SceneConfigs.PushFromRight;
			          }}
			          renderScene={(route, navigator) => {
			            let Component = route.component;
			            return <Component {...route.params} navigator={navigator} />
			          }} />
		        </View>
            </Drawer>
        
        );

    }
}
