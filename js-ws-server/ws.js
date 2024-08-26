const WebSocket = require('ws');

/* 웹소켓 서버 생성 */
const WebSocketServer = new WebSocket.Server({ port: 8080 });

WebSocketServer.on('connection', function connection(ws) {
  console.log('Success to connection');

  /* 메시지 수신 */
  ws.on('message', function incoming(message) {
    console.log('받은 메시지:', message.toString());
    
    /* 모든 클라이언트에게 메시지 브로드캐스트 */
    WebSocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  /* 클라이언트에게 메시지 전송 */
  ws.send('서버에 연결되었습니다.');
});
