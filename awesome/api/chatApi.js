var $util = require('../util/util');

module.exports = {
    ioQuene : [],
    io : {},
    init : function (ioObj) {
        this.io = ioObj;
    },
    ioInitSocket : function (activeId, nsp, callback, res){
        console.log('ioInitSocket call');
        var result = {code:1};
        callback(res, result);
        //传入已有的nsp;
        if(nsp) {
            console.log('nsp exist !');
            return;
        }
        //没有传入则新建nsp
        var io = this.io;
        var nsp = io.of('/'+activeId);
        //存储新的nsp
        this.ioQuene.push(nsp);
        console.log('run here ===========');
        //添加监听
        this.addIoListen(nsp, activeId);
    },
    ioCreateRooms : function (req, res, next){
        console.log('ioCreateRooms call')
        //GET 请求触发
        //io namespaces 以活动id构造唯一socket
        console.log(req.cookies);
        var activeId = req.query.activeId,
            account = req.cookies.account;
        if(!activeId || !account){
            $util.jsonWrite(res,{code:-1});
            return;
        }
        var nsp = this.getNsp(activeId);
        console.log('ioCreateRooms nsp is' ,nsp);
        if(nsp == 'error'){
            console.log('not pass the activeId')
            $util.jsonWrite(res,{code:0})
            return;
        } 
        this.ioInitSocket(activeId, nsp, $util.jsonWrite, res);
    },
    addIoListen : function (nsp, activeId) {
        nsp.on('connection', function (socket) {

            socket.on('online', function(data) {
                if(!!data.user || !!data.userName) return;
                console.log('[socket of '+activeId + ']:' + data.user + ' come into');
                var newData = {
                    fromId : data.user,
                    msg:'Welcome'+data.userName,
                    kind:'sever'
                }
                nsp.emit('online', data)
            })
            socket.on('userMsg', function (msg) {
                nsp.emit('userMsg', msg);
            });
        });
    },
    getNsp : function (activeId){
        //activeId 长度非0字符串则允许通过
        if(activeId.length === 0) {
            return 'error';
        }
        //遍历查找是否存在nsp
        var targetId = '/'+activeId;
        var nspList = this.ioQuene;
        for(var i = 0;i<nspList.length;i++){
            var obj = nspList[i];
            if(obj.name === targetId){
                console.log('=====targetId======exist');
                console.log('target nsp is ',obj);
                return obj;
            } 
        }
        return null
    }

}
