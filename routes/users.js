var express = require('express');
var router = express.Router();

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

//引入数据库包
var db = require("./db.js");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
  db.query('select * from users', function (err, rows) {
    if (err) {
      res.render('users', {title: 'Express', datas: []});  // this renders "views/users.html"
    } else {
      res.render('users', {title: 'Express', datas: rows});
    }
  })
});
/**
 * 新增页面跳转
 */

router.get('/add', function (req, res) {
  res.render('add');
});
router.post('/add', function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var mailid = req.body.mailid;
  var geziid = req.body.geziid;
  var geziid2 = req.body.geziid2;
  var password = req.body.password;

  db.query("insert into users (id,name,mailid,geziid,geziid2,password) values('" + id  + "','" + name +  "','"+ mailid +  "','"+ geziid +  "','" + geziid2 + "','" + password + "')", function (err, rows) {
    if (err) {
      res.end('fail：\n' + err);
    } else {
      res.redirect('/users');
    }
  })
});

/**
 * 删
 */
router.get('/del/:id', function (req, res) {
  var id = req.params.id;
  db.query("delete from users where id=" + id, function (err, rows) {
    if (err) {
      res.end('删除失败：' + err)
    } else {
      res.redirect('/users')
    }
  });
});
/**
 * 修改
 */
router.get('/toUpdate/:id', function (req, res) {
  var id = req.params.id;
  db.query("select * from users where id=" + id, function (err, rows) {
    if (err) {
      res.end('修改页面跳转失败：' + err);
    } else {
      res.render("update", {datas: rows});       //直接跳转
    }
  });
});
router.post('/update', function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var mailid = req.body.mailid;
  var geziid = req.body.geziid;
  var geziid2 = req.body.geziid2;
  var password = req.body.password;




  db.query("update users set name='" + name + "',age='" + age + "' where id=" + id, function (err, rows) {
    if (err) {
      res.end('修改失败：' + err);
    } else {
      res.redirect('/users');
    }
  });
});
/**
 * 查询
 */
router.post('/search', function (req, res) {
  var name = req.body.s_name;
  var age = req.body.s_age;

  var sql = "select * from users";

  if (name) {
    sql += " and name='" + name + "' ";
  }

  if (age) {
    sql += " and age=" + age + " ";
  }
  sql = sql.replace("and","where");
  db.query(sql, function (err, rows) {
    if (err) {
      res.end("查询失败：", err)
    } else {
      res.render("users", {title: 'Express', datas: rows, s_name: name, s_age: age});
    }
  });
});


module.exports = router;
