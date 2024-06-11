'use client'

import { useEffect, useRef } from 'react'

const WebScoetPage = () => {
  const socketRef = useRef<null | WebSocket>(null)
  const inputRef = useRef<null | HTMLTextAreaElement>(null)

  useEffect(() => {
    const Socket = new WebSocket('ws://localhost:8080')
    socketRef.current = Socket

    Socket.onopen = () => {
      console.log('\x1b[32m---WebSocket 连接成功---\x1b[0m')
      //发送消息给服务端
      // Socket.send('Hello , server端')
    }

    //接收服务端消息的回调函数
    Socket.onmessage = (event) => {
      const message = event.data
      console.log('\x1b[32m---收到服务器的消息---\x1b[0m', message)
      // inputRef.current!.value = message

      // //收到信息为Blob类型时
      let result = message
      if (message instanceof Blob) {
        const reader = new FileReader()
        reader.readAsText(message, 'UTF-8')
        reader.onload = (e) => {
          //字符串和json格式
          console.log(reader.result)
          result = JSON.parse(JSON.stringify(reader.result))
          console.log('\x1b[32m---websocket收到blob:---\x1b[0m', result)
          inputRef.current!.value = result
        }
      } else {
        inputRef.current!.value = result
      }
    }
    //连接关闭的回调函数
    Socket.onclose = () => {
      console.log('WebSocket 连接已经关闭')
    }
    //连接错误的回调函数
    Socket.onerror = () => {
      console.log('WebSocket 连接发生错误')
    }
  }, [])

  const sendMessage = (e: InputEvent) => {
    console.log(e)
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(inputRef.current!.value)
      inputRef.current!.value = ''
    } else {
      console.log('WebSocket 连接未建立或已关闭')
    }
  }

  return (
    <div className="text-center h-screen">
      <div className=" mt-[50vh] translate-y-[-50%]">
        <p>
          websocket，请先执行
          <span className=" text-blue-300">`npm run server`</span>
          启动服务端
        </p>
        <p>并打开控制台查看发送情况</p>
        <div className=" my-[20px]">
          <textarea
            className=" w-[500px] h-[200px] text-black p-[10px]"
            ref={inputRef}
            onChange={sendMessage}
          />
        </div>
        {/* <button onClick={sendMessage}>发送信息给服务端</button> */}
      </div>
    </div>
  )
}

export default WebScoetPage
