
function timeoutify(fn,delay){
    var intv =  setTimeout(()=>{
        intv = null
        fn(new Error('timeout!'))
    },delay)
    return ()=>{
        if(fn){
            clearTimeout(intv)
            fn.apply(this,[null].concat([].slice.call(arguments)))
        }
    }
}

function asyncify(fn) {
	var orig_fn = fn,
		intv = setTimeout( function(){
			intv = null;
			if (fn) fn();
		}, 0)
	;
	fn = null;
	return function() {
		// 触发太快，在`intv`计时器触发来
		// 表示异步回合已经过去之前？
		if (intv) {
			fn = orig_fn.bind.apply(
				orig_fn,
				// 将包装函数的`this`加入`bind(..)`调用的
				// 参数，同时currying其他所有的传入参数
				[this].concat( [].slice.call( arguments ) )
			);
		}
		// 已经是异步
		else {
			// 调用原版的函数
			orig_fn.apply( this, arguments );
		}
	};
}
exports.timeoutify = timeoutify
exports.asyncify = asyncify

// 使用“错误优先”风格的回调设计
function foo(err,data) {
	if (err) {
		console.error( err );
	}
	else {
		console.log( data );
	}
}

function asyncWork(callBack){
    setTimeout(()=>{
        callBack(null,'values')
    },2000)
}

asyncWork(timeoutify(foo,3000))
