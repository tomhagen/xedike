const _ = require("lodash")

// _isEmpty
// check xem object/array có phần tử nào hay không
const obj=  {}
console.log("check binh thuong: ", Object.keys(obj).length === 0)
console.log("check empty with lodash: ", _.isEmpty(obj))

// _.get
let obj2 = {}
// // obj2 = result
// // can lay obj2.content.attributes.id
const id = obj2.content && obj2.content.attributes && obj2.content.attributes.id
console.log(id)
console.log("lay id voi lodash: ", _.get(obj2, "content.attributes.id"))

//_.set
_.set(obj2, "content.attributes.id","2")


//npm i lodash