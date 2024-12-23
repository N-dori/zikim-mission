const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler()

let io;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  io = new Server(server, {
    cors: {
      origin: dev ? "*" : "https://zikim-mission.vercel.app", 
      methods: ["GET", "POST"]
    },
    pingTimeout: 60000, // Set the ping timeout to 60 seconds
    pingInterval: 25000 // Set the ping interval to 25 seconds
  });

  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`)

    socket.on('playerAdded', (player) => {
      console.log('Player added:', player)
      socket.broadcast.emit('playerAdded', player)
    })
    socket.on('allHere', ({ roomId }) => {
      console.log(`All here event received for room ${roomId}`)
      socket.broadcast.emit('allHere');
    })

    socket.on('addPlayerScore', (newScore) => {
      console.log('adding score of player:', newScore)
      socket.broadcast.emit('addPlayerScore', newScore)
    })
    socket.on('next question', () => {
      console.log('in socket server moing to next question:')
      socket.broadcast.emit('next question')
    })
    socket.on('setFinalResultes', (newScoreSummery) => {
      console.log('in socket server getting final score results :',newScoreSummery)
      socket.broadcast.emit('setFinalResultes',newScoreSummery)
    })

    socket.on('disconnect', (reason) => {
      console.log(`Socket ${socket.id} disconnected. Reason: ${reason}`)
    })

    socket.on('error', (error) => {
      console.error(`Socket error: ${error}`);
    })
  })

  server.listen(3000, (err) => {
    if (err) {
      console.error('Server error:', err);
      throw err
    }
    console.log('> Ready on http://localhost:3000')
  });
}).catch((err) => {
  console.error('Error preparing Next.js app:', err)
});

module.exports = { io };