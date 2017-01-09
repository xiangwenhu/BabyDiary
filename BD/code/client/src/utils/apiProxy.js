const defaultOptions = {
        headers:{
            isFetch:1
        }
    }
let _baseUrl = '/'


export default {
    get baseUrl(){
        return _baseUrl
    },
    set baseUrl(url){
        _baseUrl = url
    },
    fetch(url,options = defaultOptions){
        console.log(`fetch url:${_baseUrl + url}`)
        return new Promise((resolve,reject)=>{
            fetch(_baseUrl + url,options).then(response=>response.json())
            .then(data=>resolve(data)).catch(err=>reject(err))
        })
    }
}