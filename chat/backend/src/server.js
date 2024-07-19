const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve os arquivos estáticos da pasta 'public'

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('message', (message) => {
        console.log('Mensagem recebida:', message);
        io.emit('message', message); // Envia a mensagem para todos os clientes conectados
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
