import Echo from 'laravel-echo';

import socketio from 'socket.io-client';


export default new Echo({
    host: 'http://10.19.1.31:6001',
    broadcaster: 'socket.io',
    client: socketio,
    transports: ['websocket']
});
