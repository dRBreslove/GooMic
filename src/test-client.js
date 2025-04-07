const WebSocket = require('ws');
const { createLogger } = require('./utils/logger');

const logger = createLogger('TestClient');

class WebSocketTestClient {
    constructor (url = 'ws://localhost:8080') {
        this.url = url;
        this.ws = null;
        this.clientId = null;
        this.remoteClientId = null;
    }

    connect () {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.on('open', () => {
                logger.info('Connected to WebSocket server');
                resolve();
            });

            this.ws.on('message', (data) => {
                const message = JSON.parse(data);
                logger.debug('Received message:', message);

                switch (message.type) {
                case 'clientId':
                    this.clientId = message.id;
                    logger.info('Got client ID:', this.clientId);
                    break;
                case 'text':
                    logger.info('AI Response:', message.text);
                    break;
                }
            });

            this.ws.on('error', (error) => {
                logger.error('WebSocket error:', error);
                reject(error);
            });

            this.ws.on('close', () => {
                logger.info('Disconnected from WebSocket server');
            });
        });
    }

    sendMessage (text, aiType) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket is not connected');
        }

        const message = {
            type: 'text',
            text: text,
            target: this.clientId, // Send to self for testing
            ai: aiType,
        };

        logger.info(`Sending message to ${aiType}:`, text);
        this.ws.send(JSON.stringify(message));
    }

    close () {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Test function
async function runTests () {
    const client = new WebSocketTestClient();

    try {
        // Connect to server
        await client.connect();

        // Test Gemini
        logger.info('=== Testing Gemini ===');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for connection
        client.sendMessage('What is the capital of France?', 'gemini');

        // Wait for response
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Test Copilot
        logger.info('=== Testing Copilot ===');
        client.sendMessage('What is the largest planet in our solar system?', 'copilot');

        // Wait for response
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Close connection
        client.close();
        logger.info('Tests completed');

    } catch (error) {
        logger.error('Test failed:', error);
        client.close();
    }
}

// Run the tests
runTests();
