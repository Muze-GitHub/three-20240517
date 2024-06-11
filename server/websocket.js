const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })
const connections = [] // 存储连接的数组

let initContent = `我是初始文本`

console.log('\x1b[32mWebSocket启动成功，端口号为8080\x1b[0m')

const sentToAllConnections = (message) => {
  connections.forEach((connection) => {
    connection.send(message)
  })
}

const OperationTransform = () => {}

wss.on('connection', function connection(ws) {
  console.log('有新的连接')
  connections.push(ws)
  ws.send(initContent)
  ws.on('message', function incoming(message) {
    console.log('\x1b[32m---收到客户端消息---\x1b[0m: %s', message)
    initContent = message
    sentToAllConnections(message)
  })

  ws.on('close', function disconnect() {
    console.log('websocket断开连接')
    // 在连接关闭时从数组中移除连接对象
    const index = connections.indexOf(ws)
    if (index !== -1) {
      connections.splice(index, 1)
    }
  })
})
