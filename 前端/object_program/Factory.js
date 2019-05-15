
SIMPLE_DOM_LIST = ['div','span']
SRC_DOM_LIST = ['img','video']

DomFactory.prototype.setAttr = function(attr,value){
    if (this.element){
        this.element.setAttribute(attr,value)
        return this
    }else{
        throw new Error('Factory instance must contain an element attribute')
    }
}

//简单的html 默认往里面添加文字innerHTML
SIMPLE_DOM_LIST.forEach(element=>{
    DomFactory.prototype[element] = function(opt){
        let dom = document.createElement(element)
        dom.innerHTML = opt.innerHTML?opt.innerHTML:''
        this.setAttr = DomFactory.prototype.setAttr
        this.element =  dom
    }
})

SRC_DOM_LIST.forEach(element =>{
    DomFactory.prototype[element] = function(opt){
        let dom  = document.createElement(element)
        if (opt.src){
            dom.src=opt.src;
        }else{
            console.warn('The element must be created with the attribute "src"')
        }
        this.setAttr = DomFactory.prototype.setAttr
        this.element = dom
        
    }
})


function DomFactory(element,opt){
    //实例化对象监视语句，防止漏掉new 语法
    if (this instanceof DomFactory){
        if(element in this){
            return new DomFactory.prototype[element](opt)
        }else{
            throw new Error('Factory mode does not include the object function')
        }
    }else{
        return new DomFactory(element,text)
    }
}

let a = new DomFactory('div',{innerHTML:'测试文字'})
let b = new DomFactory('img',{
    src:'https://avatar-static.segmentfault.com/350/199/3501995226-58bf78615095f_big64'
}).setAttr('height',300)

document.getElementById('main').appendChild(a.element)
document.getElementById('main').appendChild(b.element)