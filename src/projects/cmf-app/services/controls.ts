import { io } from 'socket.io-client'
import type { App } from 'vue'

const PORT = import.meta.env.VITE_SOCKET_PORT

const socket = io(`http://localhost:${PORT}`, {
  secure: false,
  transports: ['websocket', 'polling']
})

socket.on('connect', () => {
  console.log('socket is connected')

  socket.on('disconnect', () => {
    console.log('socket is disconnected')
  })
})

export default {
  install: (app: App) => {
    app.provide('socket', socket)
  }
}
