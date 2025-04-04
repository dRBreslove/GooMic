import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map();

wss.on('connection', (ws) => {
    const clientId = uuidv4();
    clients.set(clientId, ws);
    // eslint-disable-next-line no-console
    console.log(`New client connected: ${clientId}`);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            switch (data.type) {
            case 'text': {
                const targetClient = clients.get(data.target);
                if (targetClient && targetClient.readyState === WebSocket.OPEN) {
                    targetClient.send(JSON.stringify({
                        type: 'text',
                        text: data.text,
                    }));
                }
                break;
            }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        // eslint-disable-next-line no-console
        console.log(`Client disconnected: ${clientId}`);
    });
});

// eslint-disable-next-line no-console
console.log('Signaling server running on port 8080');
