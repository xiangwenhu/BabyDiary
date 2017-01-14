let UserModel = require('../models/User')
const crypto = require('crypto')
let ERROR = require('../consts/ErrorMsg')

module.exports = {
    //注册
    register: async function (user) {
        //加密密码
        user.pwd = crypto.createHash('md5').update(user.pwd).digest('hex')
        let u = new UserModel(user),
            err = u.validateSync()  //同步验证

        //如果有错误，返回错误消息 ,错误消息格式  
        /*
        {
            "errors": {
                "userName": {
                "message": "用户名不能为空",
                "name": "ValidatorError",
                "properties": {
                    "type": "required",
                    "message": "用户名不能为空",
                    "path": "userName"
                    },
                "kind": "required",
                "path": "userName"
                }
            },
            "message": "User validation failed",
            "name": "ValidationError"
        } */

        if (err && err.errors) {
            return Promise.resolve({
                status: false,
                message: Object.values(err.errors)[0].message
            })
        }

        //保存用户
        //验证的错误消息格式和上面一致
        //操作的错误消息格式
        /*
        {
            "code": 11000,
            "index": 0,
            "errmsg": "E11000 duplicate key error collection: babydiary.users index: userName_1 dup key: { : \"1\" }",
            "op": {
                "phone": "15801576446",
                "userName": "1",
                "pwd": "cb12f6f2d746b0b9c130cee6eb0bd647",
                "_id": "5871bd3cb6133b1f20f9f2ea",
                "isDelete": false,
                "failedLoginCount": 0,
                "isEmailVerified": false,
                "updateTime": "2017-01-08T04:17:00.540Z",
                "createTime": "2017-01-08T04:17:00.540Z",
                "__v": 0
            }        
        } */

        //手机唯一性
        if (user.phone) {
            let phone = await UserModel.findOne({ phone: user.phone }).exec().catch(err => {
                return {
                    message: err.errmsg || (err.errors ? Object.values(err.errors)[0].message : ERROR.MONGO_ERROR),
                    status: false,
                    code: err.code || 99999
                }
            })

            if (phone) {
                return {
                    message: ERROR.USER_PHONE_REGISTERED,
                    status: false
                }
            }
        }

        //邮箱唯一性      
        if (user.email) {
            let email = await UserModel.findOne({ email: user.email }).exec().catch(err => {
                return {
                    message: err.errmsg || (err.errors ? Object.values(err.errors)[0].message : ERROR.MONGO_ERROR),
                    status: false,
                    code: err.code || 99999
                }
            })

            if (email) {
                return {
                    message: ERROR.USER_EMAIL_REGISTERED,
                    status: false
                }
            }
        }


        let result = await u.save().then(() => { return { data: u, status: true } })
            .catch(err => {
                console.log(JSON.stringify(err))
                return {
                    message: err.errmsg || (err.errors ? Object.values(err.errors)[0].message : ERROR.MONGO_ERROR),
                    status: false,
                    code: err.code || 99999
                }
            })
        return result
    },
    //type phone|userName|email
    async login(identifier, pwd, type = 'phone') {   
        try {           
            let user = await UserModel.findOne({ [type]: identifier }).exec()          
            if (user) {
                let cryPwd = crypto.createHash('md5').update(pwd).digest('hex')
                if (user.pwd == cryPwd) {
                    return {
                        status: true,
                        code: 100000
                    }
                }
                return {
                    status: false,
                    code: 200002,
                    message: ERROR.USER_PWD_ERROR
                }
            } else {
                return {
                    status: false,
                    message: ERROR.USER_UNREGISTER,
                    code: 200001
                }
            }

        } catch (err) {
            console.log('error:' + err)
            return {
                status: false,
                message: err.message || ERROR.SERVER_ERROR
            }
        }

    }

}