const jsonServer = require('json-server')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(cors({
  origin: 'http://localhost:5173', // или твой фронт
  credentials: true
}))

server.use(middlewares)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})