const { Server } = require('socket.io');
const http = require('http');

/* HTTP 서버 생성 */
const server = http.createServer();

/* Socket.IO 서버 생성 */
const io = new Server(server, {
  cors: {
    origin: '*', /* 모든 도메인에서의 요청을 허용 (필요시 특정 도메인만 허용) */
  }
});

/* Socket.IO 이벤트 처리 */
io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); /*  모든 클라이언트에게 메시지 브로드캐스트 */
  });

  socket.on('disconnect', () => {
    console.log('Disconnected WS client');
  });
});

/* 서버 시작 */
server.listen(3000, () => {
  console.log('Listening on port', 3000);
});
