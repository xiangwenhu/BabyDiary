import React from 'react'
import {
    View,
    Navigator,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

import Login from './Login'

export default class FirstPageComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.pressButton = this.pressButton.bind(this)
    }
    pressButton() {
        const { navigator } = this.props
        if(navigator) {
            navigator.push({
                name: 'login',
                component: Login,
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pressButton}>
                    <Text  style={styles.welcome}>这个是注册页面，点击去Login</Text>
                </TouchableOpacity>
            </View>
        )    
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }  
})