/**
 * 
 * 数据格式 {
 *   phone:'15801576998',
 *   email:'xiangwenhu@hotmail.com'
 *   family:{
 *      fatherPhone:'1999999'
 *   }
 * }   
 * 
 *  配置的验证格式
 * {
 *    email:{
 *              rules: 'require|phone'
 *              messages:{
 *                  require:'必填项',
 *                  phone:'请输入正确的手机号'
 *              }
 *          } 
 *     'family.fatherPhone':{
 *          ruels:'require|phone'
 *          messages:{
 *              phone:'请输入正确的父亲的手机号码'
 *          }
 *      }
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 */
class Validator {

    /** 添加验证规则
     {
        name:'phone',       
        method:function (val) {
            return  100 >= val;
        }
        message:'数值必须大于100'
      }
      
    **/
    static addRule(rule) {
        if (rule && rule.name) {
            Validator.rules[rule.name] = rule
        }
    }
    /**验证数据
     * */
    static validate(data, mapping) {
        let ret = {
                status: true
            }
        if (mapping && mapping instanceof Object) {
            for (let m of Object.keys(mapping)) {
                let curMsgs = mapping[m].messages, //获取自定义的消息
                    val = Validator.getPropVal(data, m)
                //遍历所有的rule，格式为 require|phone
                mapping[m].rules.split('\|').every(r => (ret = Validator.validateSingleRule(val, r, curMsgs ? curMsgs[r] : undefined)).status ? true : false)
                if (!ret.status) {
                    return ret
                }
            }
        }
        return ret
    }


   //验证多条规则
   static validateMultiRule(str,ruleNames,messages){
       let ret = {status:true}
       if(!ruleNames){
           return {
               status:false,
               message:'传入的rules为空'
           }
       }
       let rules = ruleNames.split('\|')       
       rules.every(r => (ret = Validator.validateSingleRule(str, r, messages ? messages[r] : undefined)).status ? true : false)
       return ret
   }

    //验证单挑规则
    static validateSingleRule(str, ruleName, msg) {
        let rule = Validator.rules[ruleName] //获得rule
        if (!rule) {
            return {
                status: false,
                message: `未找到验证规则${ruleName}`
            }
        }
        let pass = rule.method(str)
        if (pass) {
            return { status: true }
        }
        return {
            status: false,
            message: msg || rule.message || Validator.defaultMessages[ruleName] || `未定义规则为${ruleName}的消息`
        }
    }

    static getPropVal(data, propName) {
        let val = data
        propName.split('.').forEach(function (v) {
            val = val[v]
        })
        return val
    }
}

Validator.rules = {
    require: {
        method: str => !(str == undefined || str.trim() == '')
    },
    phone: {
        method: str => /^1(3\d|4(7)|5(0|1|2|3|5|6|7|8|9)|68|7(0|3|6|7|8)|8\d)\d{8}$/.test(str),
        message: '我的手机号码？？？'
    },
    province: {
        method: str => str.length <= 5
    }
}

Validator.defaultMessages = {
    require: '必填项',
    phone: '请输入正确的手机号码',
    age: '请输入正确的年龄'
}


module.exports = Validator