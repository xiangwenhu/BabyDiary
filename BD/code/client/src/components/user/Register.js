import React from 'react'
import {
    View,
    Navigator,
    TouchableOpacity,
    Text,
    TextInput,
    Button,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Dimensions,
    PixelRatio
} from 'react-native'

import Login from './Login'
let Validator = require('../../../lib/validator')
import apiProxy from '../../utils/apiProxy'

let validateConfig = {
    userName: {
        rules: 'require|min:2',
        messages: {
            require: '用户名不能为空',
            min: '用户名不能少于两个字符'
        }
    },
    phone: {
        rules: 'require|phone',
        messages: {
            require: '手机号码不能为空',
            phone: '请输入正确的手机号码'
        }
    },
    pwd: {
        rules: 'require|min:6',
        messages: {
            require: '密码不能为空',
            min: '密码不能少于两个字符'
        }
    },
    rePwd: {
        rules: 'require|min:6',
        messages: {
            require: '确认密码不能为空',
            min: '确认密码不能少于两个字符'
        }
    },
}

apiProxy.baseUrl = 'http://babydairy2017.cloudapp.net:8080/'



export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            phone: '',
            pwd: '',
            mes: {}  //验证消息
        }
        this.pressButton = this.pressButton.bind(this)
    }
    pressButton() {
        const { navigator } = this.props
        if (navigator) {
            navigator.push({
                name: 'login',
                component: Login,
            })
        }
    }

    //验证
    validate(ev, type) {
        let val = ev.nativeEvent.text,
            rule = validateConfig[type],
            vr = Validator.validateMultiRule(val, rule.rules, rule.messages),
            mes = this.state.mes
        vr.status?mes[type] = null : mes[type] = this.buildErrorMessage(vr.message)    
        this.setState({
            mes: mes
        })

        this.setState({
            [type]: val
        })
    }

    buildErrorMessage(message) {
        return <Text style={[styles.textInput, styles.textMessage]}>{message}</Text>
    }

    _scrollToInput() {
        let scrollView = this.refs.myScrollView.getScrollResponder(),
            scrollResponder = scrollView.getScrollRef()

        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            React.findNodeHandle(this.refs.myInput),
            0, // adjust depending on your contentInset
            true // preventNegativeScrollOffset 
        )
    }

    //注册
    register() {

        apiProxy.fetch('user/register', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: this.state.userName,
                phone: this.state.phone,
                pwd: this.state.pwd
            })
        }).then(data => alert(JSON.stringify(data))).catch(err => {
            alert(JSON.stringify(err))
        })
    }

    render() {
        /*<TouchableOpacity onPress={this.pressButton}>
            <Text  style={styles.welcome}>这个是注册页面，点击去Login</Text>
        </TouchableOpacity>  */

        return (

            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView contentContainerStyle={styles.scrollView} ref="myScrollView">
                        <TextInput style={styles.textInput} placeholder="请输入用户名" maxLength={20} value={this.state.userName} onEndEditing={(ev) => { this.validate(ev, 'userName') } } onChange={(ev) => { this.validate(ev, 'userName') } } />
                        {this.state.mes['userName']}
                        <TextInput style={styles.textInput} placeholder="请输入手机号码" value={this.state.phone} onEndEditing={(ev) => { this.validate(ev, 'phone') } } onChange={(ev) => { this.validate(ev, 'phone') } } />
                        {this.state.mes['phone']}
                        <TextInput style={styles.textInput} placeholder="请输入密码" value={this.state.pwd} onEndEditing={(ev) => { this.validate(ev, 'pwd') } } onChange={(ev) => { this.validate(ev, 'pwd') } } />
                        {this.state.mes['pwd']}
                        <TextInput style={styles.textInput} placeholder="请输入确认密码" onEndEditing={(ev) => { this.validate(ev, 'rePwd') } } onChange={(ev) => { this.validate(ev, 'rePwd') } } />
                        {this.state.mes['rePwd']}
                        <Button style={styles.btnRegister} Text={'注    册'} title={'注   册'} onPress={() => this.register()} />
                    </ScrollView>

                </KeyboardAvoidingView>
            </View>

        )
    }
}


const {width: sWidth, height: sHeight} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textInput: {
        width: 250
    },
    textMessage: {
        color: 'red',
        fontSize: 12
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: sHeight - 125,
        marginTop: 50,
        width: sWidth
    },
    btnRegister: {
        width: 250
    }
})