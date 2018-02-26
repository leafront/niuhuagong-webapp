var request = require("request")

//初中数学

function getTree(id){
	var url = `http://www.zujuan.com/question/tree?id=${id}&type=knowledge`  //获取知识点

	console.log(url)
	request(url,(error,response,body) => {
		if(!error && response.statusCode == 200){
			var tree = JSON.parse(body)
			recursionTree(tree)
		}
	})
}

function recursionTree(obj){//递归知识点树
	console.log(obj)
	for(var i = 0; i < obj.length; i++){
		if(obj[i].hasChild){
			obj[i].children = []
			getTree(obj[i].id)
		}
	}
	console.log(obj)
}

getTree(0)