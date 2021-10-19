import './socket';

import { httpServer as server } from './app';

server.listen(4000, () => {
  console.log('server is runing 🚀');
});
