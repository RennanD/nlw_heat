import { Server } from 'socket.io';

import { httpServer } from './app';

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

export { io };
