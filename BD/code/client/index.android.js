/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native'
import Register from './src/components/user/Register'
import NavigationBarRouteMapper from './src/components/public/NavigationBarRouteMapper'

export default class BabyDairy extends React.Component {
  render() {
    let defaultName = 'login'
    let defaultComponent = Register
    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        configureScene={() => {
          return Navigator.SceneConfigs.VerticalDownSwipeJump
        }}
        renderScene={(route, navigator) => {
          let Component = route.component
          return <Component {...route.params} navigator={navigator} />
        }}
        navigationBar={<Navigator.NavigationBar routeMapper={NavigationBarRouteMapper} /> }
        />
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

AppRegistry.registerComponent('BabyDairy', () => BabyDairy)