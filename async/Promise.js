function Promise(fn){
  var __resolveLists = [];
  var __rejectLists = [];
  //保存收到的值
  var __value 
  //异步执行方法
  var asyncCall = process.nextTick;
  var __state = 'pending'//or 'fulfilled',or 'rejected'
  this.then = function(resolve,reject){
    //先要check类型
    switch (__state){
        case 'pending':
          __resolveLists.push(resolve)
          __rejectLists.push(reject)
          break;
        case 'fulfilled':
          resolve(__value)
          break;
        case 'rejected':
          reject(__value)
          break;
    }
    return this
  }
  function resolve(v){
    //保存它是异步执行的.
    // console.log('resolve value',v)
    __value = v
    __state = 'fulfilled'
    asyncCall(()=>{
      var value = v
      for (let i =0 ;i < __resolveLists.length;i++){
          var temp = __resolveLists[i](value)
          if (temp instanceof Promise){
            var newP = temp
            for(i++;i<__resolveLists.length;i++){
              newP.then(__resolveLists[i],__rejectLists[i])
            }
          }else{
            value = temp
          }
      }
    })
  }
  function reject(e){
      //保存它是异步执行的.
      __value = e
      __state = 'rejected'
      asyncCall(()=>{
        __rejectLists.forEach(fulfill=>{
          fulfill(v)
        })
      })
  }
  fn(resolve,reject)
}

module.exports = Promise


// var PENDING = 0
// var FULFILLED = 1
// var REJECTED = 2

// class Promise{
//     constructor(fn){
//       this.state = PENDING
//       this.value = null
//       // store sucess & failure handlers attached by calling .then or .done
//       this.handles = []
//       doResolve(fn, this._fulfill, this._reject);
//     }
//     _fulfill(result){
//       this.state = FULFILLED
//       this.value = result
//     }
//     _reject(error){
//       this.state = REJECTED
//       this.value = error
//     }
//     done(onFulfilled,onRejected){
//       setTimeout(()=>{
//         this._handler({
//           onFulfilled:onFulfilled,
//           onRejected: onRejected
//         })
//       },0)
//     }
//     _handler(handle){
//       switch(this.state){
//         case PENDING:
//           this.handles.push(handle)
//         break;
//         case FULFILLED:
//         if( typeof handle.onFulfilled === 'funtion'){
//           handle.onFulfilled(this.value)
//         }
//         break;
//         case REJECTED:
//         if( typeof handle.onRejected === 'funtion'){
//           handle.onRejected(this.value)
//         }
//         break;
//       }
//     }

//     resolve(result){
//       //dosomething
//       try {
//         var then = getThen(result)
//         if(then){
//           doResolve(then.bind(result),this._fulfill,this._reject)
//           return
//         }
//         this._fulfill(result)
//       } catch (error) {
//         this._reject(error)
//       }
//     }
//     then (onFulfilled,onRejected){
//         return new Promise((resolve,reject)=>{
//           return self.done((result=>{
//             if (typeof onFulfilled === 'function'){
//               try {
//                 return resolve(onFulfilled(result))
//               } catch (error) {
//                 return reject(error)
//               }
//             }else{
//               return resolve(result)
//             }
//           }),(error)=>{
//             if (typeof onRejected === 'function'){
//               try {
//                 return resolve(onRejected(error))
//               } catch (error) {
//                 return reject(error)
//               }
//             }else{
//               return reject(error)
//             }
//           })
//         })
//     }
// }

// function getThen(value){
//   var t = typeof value
//   if (value && (t === 'object' || t === 'function')){
//     var then = value.then
//     if (typeof then === 'function'){
//       return then
//     }
//   }
//   return null
// }

// function doResolve(fn, onFulfilled, onRejected) {
//   var done = false;
//   try {
//     fn(function (value) {
//       if (done) return
//       done = true
//       onFulfilled(value)
//     }, function (reason) {
//       if (done) return
//       done = true
//       onRejected(reason)
//     })
//   } catch (ex) {
//     if (done) return
//     done = true
//     onRejected(ex)
//   }
// }module.exports = Promise