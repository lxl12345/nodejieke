var express = require('express');
var router = express.Router();
var mysql = require("mysql");


var con = mysql.createPool({
		host: "localhost",
		user: "root",
		password: "123456",
		database: "nodejk",
		port: 3306
	})
/* GET users listing. */
//获取表单里所有的数据
router.post('/select', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*")
	con.query(`SELECT * FROM new_table`, function(err, rows, fields) {
		res.send(rows)
	})
});

//获取表单里的详情
router.post('/detail', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*")
	var id_two=req.body.id_two
	con.query(`SELECT * FROM new_table WHERE id='${id_two}'`, function(err, rows, fields) {
		res.send(rows)
	})
});

//插入
router.post('/insert', function(req, res, next) {
	var a = req.body.a;
	var b = req.body.b;
	res.header('Access-Control-Allow-Origin', "*")
	con.query(`INSERT INTO new_table (title,detail) VALUES ('${a}','${b}')`, function(err, rows, fields) {
		if (rows!=""||rows!=null) {
			con.query('SELECT* FROM new_table', function(err, rows, fields) {
				res.send(rows)
			});
		} 
	})
});


//删除
router.post('/del',function(req,res,next){
	res.header('Access-Control-Allow-Origin', "*")
	var id=req.body.id;
	con.query(`DELETE FROM new_table WHERE id='${id}'`, function(err, rows, fields) {
		res.send('删除成功')
	})
})


//模糊搜索
router.post('/search', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*")
 	var sum=req.body.sea;
 	con.query(`SELECT * FROM new_table WHERE title LIKE '%${sum}%' OR detail LIKE '%${sum}%'`,function(err,rows,fields){
 		res.send(rows)
 	})
});


//修改
router.post('/updata', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*")
   	var title=req.body.title;
   	var content=req.body.content;
   	var upid=req.body.upid;
   	con.query(`UPDATE new_table SET title='${title}',detail='${content}' WHERE id='${upid}'`,function(err,rows,fields){
   		if (rows!=""||rows!=null) {
			con.query('SELECT* FROM new_table', function(err, rows, fields) {
				res.send(rows)
			});
		} 
   	})
});


module.exports = router;