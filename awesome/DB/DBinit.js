/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 1.0.0
 * @date 2016-02-24
 */
var sqlite3 = require('sqlite3').verbose();
var DBname = 'awesome';
var db = new sqlite3.Database(DBname);

console.log(db)

db.serialize(function () {
  db.run('CREATE TABLE user (account TEXT, password TEXT, whenIn TEXT)');
  db.run('INSERT INTO user(account,password,whenIn) VALUES("test", "test", 123456812931823)')
});

db.close();

// db.serialize(function () {
//   db.run("CREATE TABLE user (account TEXT, password TEXT)");
//   var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
//   for (var i = 0; i < 10; i++) {
//
//   var d = new Date();
//   var n = d.toLocaleTimeString();
//   stmt.run(i, n);
//   }
//   stmt.finalize();
//
//   db.each("SELECT id, dt FROM user", function(err, row) {
//       console.log("User id : "+row.id, row.dt);
//   });
// });
//
// db.close();
