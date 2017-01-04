import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'


export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.pressButton = this.pressButton.bind(this)
    }

    pressButton() {
        const { navigator } = this.props
        if(navigator) {
            //返回上一下页面
            navigator.pop()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pressButton.bind(this)}>
                    <Text style={styles.welcome}>这是Login,点我会Register</Text>
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