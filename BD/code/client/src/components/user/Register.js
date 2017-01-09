import React from 'react'
import {
    View,
    Navigator,
    TouchableOpacity,
    Text,
    TextInput,
    Button,
    StyleSheet
} from 'react-native'

import Login from './Login'
let Validator = require('../../../lib/validator')
import apiProxy from '../../utils/apiProxy'

let validateConfig = {
    userName: {
        rules: 'require',
        messages: {
            require: '用户名不能为空'
        }
    },
    phone: {
        rules: 'require|phone',
        messages: {
            require: '手机号码不能为空'
        }
    },
    pwd: {
        rules: 'require',
        messages: {
            require: '密码不能为空'
        }
    },
    rePwd: {
        rules: 'require',
        messages: {
            require: '确认密码不能为空'
        }
    },
}

apiProxy.baseUrl = 'http://localhost:8080/'

export default class FirstPageComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            phone: '',
            pwd: ''
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
        let val = ev.target.value,
            rule = validateConfig[type],
            vr = Validator.validateMultiRule(val, rule.rules, rule.messages)
        if (!vr.status) {
            //TODO::显示错误消息
        }

        this.setState({
            [type]: val
        })


    }

    //注册
    register() {
        let data = this.state
        console.log(JSON.stringify(data))
        apiProxy.fetch('user/register', {
            method:'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    render() {
        /*<TouchableOpacity onPress={this.pressButton}>
            <Text  style={styles.welcome}>这个是注册页面，点击去Login</Text>
        </TouchableOpacity>  */
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="请输入用户名" maxLength={20} value={this.state.userName} onChange={(ev) => { this.validate(ev, 'userName') } } />
                <TextInput style={styles.textInput} placeholder="请输入手机号码" value={this.state.phone} onChange={(ev) => { this.validate(ev, 'phone') } } />
                <TextInput style={styles.textInput} placeholder="请输入密码" value={this.state.pwd} onChange={(ev) => { this.validate(ev, 'pwd') } } />
                <TextInput style={styles.textInput} placeholder="请输入确认密码" onChange={(ev) => { this.validate(ev, 'rePwd') } } />
                <Button Text={'注    册'} title={'注   册'} onPress={()=>this.register()}/>
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
    },
    textInput:{
        width:250
    }
})