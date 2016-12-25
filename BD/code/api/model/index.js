const request = require('../utils/request')
const orgRequest = require('request')


module.exports =   {

    //服务基础地址
    get baseUrl(){
        return ''
    }, 
    get getAll(){
        return async function(baseUrl = this.baseUrl,query){
            console.log('baseUrl:' + (baseUrl || this.baseUrl))
            console.log('query:' + query)
            let fullUrl = (baseUrl || this.baseUrl)  +  (query? '?' + query :'');
            console.log('fullUrl:' + fullUrl)
            let data = await request.get(fullUrl)	
            return data
        }
    }

}