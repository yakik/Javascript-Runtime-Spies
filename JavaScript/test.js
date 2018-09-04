var f1 = function(){
	a = console.log
console.log=x=>{a(x) + a(x)}
console.log(2)
f2()
}

var f2 = c => {console.log(3)}
f1()


