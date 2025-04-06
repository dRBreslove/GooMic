const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const { getAIResponse } = require('./ai-services');

const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket server running on port 8080');

const clients = new Map();

wss.on('connection', (ws) => {
    const clientId = uuidv4();
    clients.set(clientId, ws);

    // Send client ID to the new client
    ws.send(JSON.stringify({
        type: 'clientId',
        id: clientId
    }));

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            
            switch (data.type) {
                case 'text':
                    const targetClient = clients.get(data.target);
                    if (targetClient) {
                        try {
                            const response = await getAIResponse(data.text, data.ai);
                            targetClient.send(JSON.stringify({
                                type: 'text',
                                text: response
                            }));
                        } catch (error) {
                            console.error('Error getting AI response:', error);
                            targetClient.send(JSON.stringify({
                                type: 'text',
                                text: `Error: Failed to get response from ${data.ai}`
                            }));
                        }
                    }
                    break;
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        console.log(`Client ${clientId} disconnected`);
    });
});
