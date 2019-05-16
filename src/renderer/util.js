var fs = require('fs');
var join = require('path').join;

export const ExportFiles = function(file, cb){
	var result = []
	var asyncOps = 0;
	function pushResult(arr, obj){
		
		arr.push(obj);
	}
	function finder(file){
		// console.log(file)
	var stats = fs.statSync(file.path);
		    
		if(stats.isFile()){
			var obj = {
				type:'file',
				name:file.name,
				path:file.path,
				size:file.size,
				typeFile:file.name.split('.').pop(),
				isPlaying:false
			}
			pushResult(result, obj);
			if(asyncOps == 0) cb(result);
		}else{
			asyncOps++;
			fs.readdir(file.path, function(err, files){
				
				var obj = {};
				  obj.type = 'directory';
					obj.name = file.name;
					obj.children = [];
				files.forEach(function(item){
					var fpath = join(file.path, item);
					
					var stats = fs.statSync(fpath);
					
					if(stats.isFile()){
						var objItem = {
							type:'file',
							name:item,
							path:fpath,
							size:stats.size,
							typeFile:item.split('.').pop(),
							isPlaying:false
						}						
						pushResult(obj.children, objItem);
					}					
				})
				result.push(obj)
				asyncOps--;
				if(asyncOps == 0) cb(result);
			})
		}
	}
	
	finder(file);
}

export const getVideoURLlist = function(arr){
	var result = []
    function foo(arr){
		arr.map((item) => {
			if(item.type == 'file'){
				var obj = {
					type: item.typeFile,
					src: item.path
				}
				result.push(obj)
			}else{
				foo(item.children)
			}
		})
	}
	foo(arr)
	return result;
}