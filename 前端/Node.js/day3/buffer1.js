// const buf = Buffer.from('runoob','ascii')
// // 输出 72756e6f6f62
// console.log(buf.toString('hex'));

// // 输出 cnVub29i
// console.log(buf.toString('base64'));
// console.log(buf.toString('ascii'));
// console.log(buf)



const data = {
    'areacode':'4301240000001111'
}

if(!data.areacode || data.areacode.slice(0,6)!='430124'){
    console.log(1)
}else{
    console.log(data.areacode)
}