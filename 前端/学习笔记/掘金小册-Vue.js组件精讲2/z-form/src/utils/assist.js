// 向上查找指定组件
function findComponentUpward(context,componentName){
    var parent = context.$parent;
    var name = parent.$options.name;
    while(parent && (!name || componentName.indexOf(name)<0)){
        parent = parent.$parent
        if(parent) name = parent.$options.name
    }
    return parent 
}

// 向上查找所有组件
function findComponentsUpward(context,componentName){
    var parent = context.$parent;
    var parents = [];
    if(parent){
        if(parent.$options.name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent,componentName))
    }else{
        return []
    }
}

// 向下查找最近组件
function findComponentDownward(context,componentName){
    const childrens = context.$children;
    let children = null;
    if(childrens.length){
        for(const child of childrens){
            const name = child.$options.name;
            if(name === componentName){
                children = child
                break;
            }else{
                children = findComponentDownward(child,componentName);
                if(children) break;
            }
        }
    }
    return children;
}

// 向下查找所有符合组件
function findComponentsDownward(context,componentName,tempChildrenList=[]){
    const childrens = context.$children;
    if(childrens.length){
        for(const child of childrens){
            if(child.$options.name === componentName){
                tempChildrenList.push(child)
            }
            tempChildrenList.concat(findComponentsDownward(child,componentName,tempChildrenList))
            if(childrens.indexOf(child) === (childrens.length -1)){
                return tempChildrenList
            }
        }
    }else{
        return []
    }
}

// 查找兄弟角色
function findBrothersComponents(context,componentName,exceptMe = true){
    let res = context.$parent.$children.filter(item=>{
        item.$options.name === componentName
    })
    let index = res.findIndex(item =>item._uid === context._uid);
    if(exceptMe) res.splice(index,1)
    return res 
}
export {
    findComponentUpward,findComponentsUpward,findComponentDownward,findComponentsDownward,findBrothersComponents
}