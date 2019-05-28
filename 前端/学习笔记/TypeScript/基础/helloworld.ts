function helloworld(name:string) {
    console.log('hello ,',name)
}

// let me = 'zm'

let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a: newName1, b: newName2 } = o;

console.log(newName1)
// helloworld(me)