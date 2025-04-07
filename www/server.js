const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const { getAIResponse, getGeminiResponse, getAzureOpenAIResponse } = require('./ai-services');
const { createLogger } = require('./utils/logger');

const logger = createLogger('WWWServer');
const wss = new WebSocket.Server({ port: 8080 });

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

    // Send client ID to other clients
    broadcastToOthers(clientId, {
        type: 'newClient',
        id: clientId,
    });

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            let response;

            switch (data.type) {
            case 'text': {
                const targetClient = clients.get(data.target);
                if (targetClient) {
                    try {
                        response = await getAIResponse(data.text, data.ai);
                        targetClient.send(JSON.stringify({
                            type: 'text',
                            text: response,
                        }));
                    } catch (error) {
                        logger.error('Error getting AI response:', error);
                        targetClient.send(JSON.stringify({
                            type: 'text',
                            text: `Error: Failed to get response from ${data.ai}`,
                        }));
                    }
                }
                break;
            }
            case 'gemini': {
                try {
                    response = await getGeminiResponse(data.content);
                    ws.send(JSON.stringify({
                        type: 'response',
                        content: response,
                    }));
                } catch (error) {
                    ws.send(JSON.stringify({
                        type: 'error',
                        content: `Error: Gemini API Error: ${error.message}`,
                    }));
                }
                break;
            }
            case 'copilot': {
                try {
                    response = await getAzureOpenAIResponse(data.content);
                    ws.send(JSON.stringify({
                        type: 'response',
                        content: response,
                    }));
                } catch (error) {
                    ws.send(JSON.stringify({
                        type: 'error',
                        content: `Error: Azure OpenAI API Error: ${error.message}`,
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
        broadcastToOthers(clientId, {
            type: 'clientDisconnected',
            id: clientId,
        });
    });
});

function broadcastToOthers (senderId, message) {
    clients.forEach((client, clientId) => {
        if (clientId !== senderId && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

logger.info('WebSocket server running on port 8080');
