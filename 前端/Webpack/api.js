//从配置文件中读取接口配置信息
import DICT from './api_dict.js'



/* 自定义API接口类型
=================================================
    提供以下方法:
        getAPIUrl:获取host主机域名及ip,仅提供查询方法,不可修改
        list: 列出该API 所有model 所包含接口
        found:查找接口,参数为url地址,会打印出该接口描述信息和所属类别
=================================================

*/


class APIS{
    constructor(){
        this.init()
        this.createModel()
    }

    //初始化函数，获取对应测试环境和生产域名及ip
    init(){
        /*益村h5接口路径配置信息*/
        var host = window.location.host;
        var totalHost = window.location.host;
        var wxhost = window.location.host;
        host = host.substring(host.indexOf('.') + 1);
        var base = 'http://139.196.79.203:8097'; // 203域名
        var liveUrl = 'https://testh5.58yicun.com/'; // 域名-app分享时使用

        var ckUrl = "http://139.196.79.203:9081/"; // 串客本地测试环境接口地址
        var chuankeUrl = 'https://testh5.58yicun.com/test/chuanke/'; // 串客项目本地访问地址

        var compantentUrl = 'https://testdlh5.58yicun.com/yicun/dl/service/'; // 益村203代理接口地址
        var tscompantentUrl = 'https://testdlh5.58yicun.com/'; // 益村203某些登录上传接口

        var imgyzmurl = 'http://139.196.79.203:8132/imgverifycode.html';  // 1.19 lhy 验证码203地址
        var appid = 'wxc5278087de59b2e2';
        var jspUrl = "http://139.196.79.203:8097";  //测试环境
        var bigDataUrl = "http://139.196.79.203:8002";   //大数据访问地址
        // var bdurl = 'http://139.196.79.203:8131/yicun/dl/service/'; //大数据接口测试环境

        // 判断处于生产环境下用生产代理地址
        if (host === '58yicun.com' && wxhost !== 'testh5.58yicun.com') {
            compantentUrl = 'https://dl.58yicun.com/yicun/dl/service/'; //生产地址
            tscompantentUrl = 'https://dl.58yicun.com/';
            imgyzmurl = 'https://dl.58yicun.com/imgverifycode.html'
            base = ' https://yueyang-h5.58yicun.com'
            liveUrl = 'https://mobile.58yicun.com/'
            ckUrl = "https://chuanke.58yicun.com/"; //串客生产环境接口地址
            chuankeUrl = 'https://chuanke.58yicun.com/ckh5/chuanke/'
            // jspUrl = "https://h5.58yicun.com";  //jsp生产环境
            jspUrl = "https://yueyang-h5.58yicun.com";
            bigDataUrl = "http://bigh5.58yicun.com";
            // bdurl = 'http://bigh5.dl.58yicun.com/yicun/dl/service/'; //大数据接口生产地址
            appid = 'wxe99eb468a0226375'
        }
        if(totalHost === 'testh5.58yicun.com') { // 测试环境地址
            ckUrl = "https://testh5.58yicun.com/chuankeapi/"; //串客203测试环境接口地址
            chuankeUrl = 'https://testh5.58yicun.com/test/chuanke/'; // 串客项目203访问地址
        }
        this.getAPIUrl = (param) =>{
            if(param){
                try {
                    return eval(param)
                }
                catch(err){
                    throw new SyntaxError('查询不到该字段URL')
                }
            }else{
                throw new SyntaxError('请输入正确的URL名称，不允许为空')
            }   
        }
    }


    //list方法，列出所有可用model及对应api接口地址
    list(){
        var DESC_LIST = {}
        var COUNT = {}
        if(this.manual === {}){
            console.error('暂无任何Model')
        }else{
            // console.log(this.manual)
            Object.keys(this.manual).forEach((element)=>{
                if(!DESC_LIST[element]){
                    DESC_LIST[element]={}
                    COUNT[element] = {
                        total : 0
                    }
                }
                if(this.manual[element]){
                    Object.keys(this.manual[element]).forEach(
                        (item)=>{
                            if(item.indexOf('_desc') == -1){

                                if(!DESC_LIST[element][item]){
                                    DESC_LIST[element][item] = {}
                                }
                                DESC_LIST[element][item]['url'] = this.manual[element][item]
                                DESC_LIST[element][item]['desc'] = this.manual[element][item+'_desc']
                                COUNT[element].total++;
                            }
                        }
                    )
                }
            })
        }
        DESC_LIST.__count__ = COUNT
        console.log(DESC_LIST)
    }



    //found方法，查询指定api接口的具体用法，参数等
    found(url){
        var reg = new RegExp('.*html$');
        var founded = false
        if(reg.test(url)){
            Object.keys(this.manual).forEach(element=>{
                var catogery = element
                Object.keys(this.manual[element]).forEach(item=>{
                    if(this.manual[element][item] === url){
                        founded = true
                        console.log(
                            {
                                type:catogery,
                                info:this.manual[element][item+'_desc']
                            }
                        )
                            
                    }
                })
            })
            if(!founded){
                console.error('查询不到你所需要的接口')
            }
        }else{
            console.error('请输入以.html结尾的正确的查询接口地址')
        }
    }


    //createmodel 解析api_dict 配置文件，将所有键值压到 api的model对象属性中
    createModel(){
        this.models = {}
        this.manual = {}
        if(DICT){
            //遍历字典
            Object.keys(DICT).forEach(element => {
                Object.keys(DICT[element]).forEach(item => {
                    //遍历字典的所有接口类型
                    if(!this[element]){         
                        this[element] = {}
                        this.models[element] = {}
                        this.manual[element] = {}
                        this[element].__proto__.isModule = true
                    }
                    //添加到modle，改属性为lanchRequest的返回值
                    this.models[element][item] = this[element][item] = this.launchRequest(DICT[element][item][0],DICT[element][item][1])
                    //添加到描述文件
                    this.manual[element][item] = DICT[element][item][0]
                    this.manual[element][item+'_desc'] = DICT[element][item][1]
                    
                })
            });
        }
        
    }


    //生成请求对象，返回值为一个请求函数
    launchRequest(url,models_config){
        if(models_config.type == 'get'){
            return this.vGetData.bind(this,url,models_config)
        }
        else if(models_config.type == 'post'){
            console.error('正在开发中')
        }else{
            throw new SyntaxError('暂不支持该请求方式')
        }
    }


    //请求方法
    vGetData(target,info,obj){
        return new Promise((resolve,reject) =>{
            let url = `${this.getAPIUrl('compantentUrl')}${target}`;
            //是否可以使用vue-resource http库
            if(!vm.$http){  
                throw new Error('Must use in vue and make sure vue-resource is installed!')                
            }
            //参数校验判断是不是和接口文档预定的结构一样
            if(Object.keys(obj).length != Object.keys(info.param).length){
                console.warn(`${url} \n 传入参数和预定参数不一致,请确认`)
            }
            vm.$http.get(url,{
                params:obj
            })
            .then(function(res){
                if(!(res.status == 200 || res.status == 304)){
                    reject(`${url} err with http code:${res.status}`)
                }else{
                    var data = JSON.parse(res.data)
                    if(data.errcode == '0'){
                        resolve(data)
                    }else{
                        reject(`${url} \n errcode: ${data.errcode},errmsg :${data.errmsg}`)
                    }
                }
            })
        })
    }
    vPostData(target,info){
        return new Promise((resolve,reject) =>{
            let url = `${this.getAPIUrl('compantentUrl')}${target}`
            if(Object.keys(obj).length != Object.keys(info.param).length){
                console.warn(`${url} \n 传入参数和预定参数不一致,请确认`)
            }
            //post 请求
            vm.$http.post(url,obj)
            .then(function(res){
                console.log(res)
            })
            .catch(
                function(){
                    console.log('post 请求失败')
                }
            )
        })
        
    }

}

var api = new APIS()
// api.list()
// api.found('compantentUrl.html')
// api.village.judge_rule_list({
//     areacode: 430124206201,
//     year:2019,
//     month: 13,
// })
// .then((res)=>{
//     console.log(res)
// })
// api.found('business_member_life_list.html')
console.log(api)
// api.found('judge_rule_list.html')
// console.log(api.cms)
// api.list()
// export default new APIS()
