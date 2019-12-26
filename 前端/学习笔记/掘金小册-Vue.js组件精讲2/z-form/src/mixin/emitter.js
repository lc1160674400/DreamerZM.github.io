// 声明一个函数进行广播操作
function broadercast(componentName,eventName,params){
    // 遍历子组件
    this.$children.forEach(element => {
        const name = element.$options.name;
        // 如果name是子组件的名字
        if(name === componentName){
            element.$emit.apply(element,[eventName].concat(params))
        }
        // else
        else{
            broadercast.apply(element,[componentName,eventName].concat(params))
        }
    });
}
export default{
    methods: {
        dispatch(componentName,eventName,params){
            // parent变量为当前组件的父组件或者跟组件
            let parent = this.$parent || this.$root
            let name = parent.$options.name;
            // 如果parentName不等于传入name一直向上遍历
            while(parent && (!name || name !== componentName)){
                parent = parent.$parent;
                if(parent){
                    name = parent.$options.name;
                }
            }
            if(parent){
                parent.$emit.apply(parent,[eventName].concat(params));
            }
        },
        broadercast(componentName,eventName,params){
            broadercast.call(this,[componentName,eventName].concat(params))
        }
    },
}