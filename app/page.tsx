'use client'
import Image from 'next/image'
import io from "socket.io-client"
import * as http from "http";
import {useState} from "react";

const socket = io("http://localhost:5123")
export default function Home() {

  const [message,setMessage] = useState("")
  const [list,setList] = useState<{message:string}[]>([])

  const  handleSendMessage = ()=>{
    //サーバーへ送信
    socket.emit("send_message",{message:message})
    setMessage("")
  }
  //サーバーから受信
  socket.on("received_message",(data)=>{
    console.log(data)
    setList([...list,data])
  })

  return (
<div>
  <h2>チャットアプリ</h2>
  <div>
    <input type="text"
           placeholder="チャット"
           onChange={(e)=>setMessage(e.target.value)}
           value={message}
    />
    <button onClick={handleSendMessage}>チャット送信</button>
  </div>
  {list.map((chat)=>(
      <div key={chat.message} >
        {chat.message}
        </div>

  ))}
</div>
  )
}
