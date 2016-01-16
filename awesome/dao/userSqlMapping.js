/**
 * @description CRUD
 * @author 杨逸峰
 * @version 0.0.1
 * @date 2015-12-24
 */
var user = {
	insert : 'INSERT INTO user(id,password,whenIn) VALUES(?,?,?)',
	update : 'update user set xxx = ? where id = ?',
	delete : 'delete from user where id = ?',
	queryById : 'select * from user where id = ?',
	queryAll : 'select * from user'
};

module.exports = user;