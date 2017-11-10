var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var fs = require('fs'); //重新命名
var formidable = require('formidable'); //写入文件

var con = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'nodejk'
})

router.post('/img', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*"); //跨域

	var form = new formidable.IncomingForm();
	//创建formidable.IncomingForm()对象

	form.uploadDir = 'public/upload';
	//上传图片存放的路径
	form.parse(req, function(error, fields, files) {
		// console.log(fields)
		//console.log(files)
		for(var i in files) {
			var file = files[i]; //保存图片属性
			// console.log(file)

			var fName = (new Date()).getTime() //用时间戳来作为图片的新name

			switch(file.type) {
				case 'image/jpeg':
					fName = fName + ".jpg";
					break;
				case 'image/png':
					fName = fName + ".png";
					break;
				case 'image/gif':
					fName = fName + ".gif";
					break;
				case 'image/psd':
					fName = fName + ".psd";
					break;

			}
			//path: 'public\\upload\\upload_a3a0218904d67712d13e5c73fe7348ed',  
			var newPath = 'public/upload/' + fName;
			fs.renameSync(file.path, newPath);
			//接受两个参数  第一个是原有的图片的路径
			//         第二个是新路径
			res.send('upload/'+fName)

		}
		

	});

});
router.post('/photo', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	con.query('SELECT * FROM tupain', function(err, rows) {
		res.send(rows);
	})
})
//获取表单里的详情
router.post('/detail', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*")
	var id_two=req.body.id_two
	con.query(`SELECT * FROM tupain id='${id_two}'`, function(err, rows, fields) {
		res.send(rows)
	})
});
//插入
router.post('/insert', function(req, res, next) {
	var a = req.body.a;
	var b = req.body.b;
	var c = req.body.c;
	res.header('Access-Control-Allow-Origin', "*")
	con.query(`INSERT INTO tupain (img,title,sub_title) VALUES ('${c}','${a}','${b}')`, function(err, rows, fields) {
		if (rows!=""||rows!=null) {
			con.query('SELECT * FROM tupain', function(err, rows, fields) {
				res.send(rows)
			});
		} 
	})
});

router.post('/del',function(req,res,next){
	res.header('Access-Control-Allow-Origin', "*")
	var id=req.body.id;
	con.query(`DELETE FROM tupain WHERE id='${id}'`, function(err, rows, fields) {
		res.send('删除成功')
	})
})
router.post('/search', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*")
   	var sum=req.body.sea;
   	con.query(`SELECT * FROM tupain WHERE id LIKE '%${sum}%' OR img LIKE '%${sum}%'`,function(err,rows,fields){
   		res.send(rows)
   	})
});



module.exports = router;