const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const { getAIResponse } = require('./ai-services');
const { createLogger } = require('./utils/logger');

const logger = createLogger('WebSocketServer');
const wss = new WebSocket.Server({ port: 8080 });
logger.info('WebSocket server running on port 8080');

const clients = new Map();

wss.on('connection', (ws) => {
    const clientId = uuidv4();
    clients.set(clientId, ws);
    logger.debug(`Client ${clientId} connected`);

    // Send client ID to the new client
    ws.send(JSON.stringify({
        type: 'clientId',
        id: clientId,
    }));

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            logger.debug('Received message:', data);

            switch (data.type) {
            case 'text': {
                // First send the user's message back to be displayed
                ws.send(JSON.stringify({
                    type: 'text',
                    ai: data.ai,
                    text: data.text,
                    isUser: true,
                }));

                try {
                    const response = await getAIResponse(data.text, data.ai);
                    // Then send the AI response
                    ws.send(JSON.stringify({
                        type: 'text',
                        ai: data.ai,
                        text: response,
                        isUser: false,
                    }));
                } catch (error) {
                    logger.error('Error getting AI response:', error);
                    ws.send(JSON.stringify({
                        type: 'text',
                        ai: data.ai,
                        text: `Error: Failed to get response from ${data.ai}`,
                        isUser: false,
                    }));
                }
                break;
            }
            }
        } catch (error) {
            logger.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        logger.info(`Client ${clientId} disconnected`);
    });
});
