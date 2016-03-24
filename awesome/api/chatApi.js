module.exports = {
    ioQuene : [],
    io : {},
    init : function (ioObj) {
        this.io = ioObj;
        return this;
    },
    ioInitSocket : function (activeId){
        var activeId = '/testId';
        var account = 13580353945;

        var io = this.io;
        var nsp = io.of(activeId);
        // this.ioQuene.push(nsp);

        // var nsp = io.of('/'+activeId);

        nsp.on('connection', function (socket) {
            console.log('[socket of '+activeId + ']: someone come into');
            socket.on('online', function(data) {
                nsp.emit('online', data)
            })

            socket.on('userMsg', function (msg) {
                nsp.emit('userMsg', msg);
            });
        });
    },
    ioCreateRooms : function (req, res, next){
        //GET 请求触发
        //io namespaces 以活动id构造唯一socket
        var activeId = req.params.activeId,
            account = req.params.account;
            // account = req.cookies.account
        this.ioInitSocket(activeId);
    }
}
