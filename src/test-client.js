const WebSocket = require('ws');

class WebSocketTestClient {
    constructor(url = 'ws://localhost:8080') {
        this.url = url;
        this.ws = null;
        this.clientId = null;
        this.remoteClientId = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.on('open', () => {
                console.log('Connected to WebSocket server');
                resolve();
            });

            this.ws.on('message', (data) => {
                const message = JSON.parse(data);
                console.log('\nReceived message:', message);

                switch (message.type) {
                    case 'clientId':
                        this.clientId = message.id;
                        console.log('Got client ID:', this.clientId);
                        break;
                    case 'text':
                        console.log('AI Response:', message.text);
                        break;
                }
            });

            this.ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            });

            this.ws.on('close', () => {
                console.log('Disconnected from WebSocket server');
            });
        });
    }

    sendMessage(text, aiType) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket is not connected');
        }

        const message = {
            type: 'text',
            text: text,
            target: this.clientId, // Send to self for testing
            ai: aiType
        };

        console.log(`\nSending message to ${aiType}:`, text);
        this.ws.send(JSON.stringify(message));
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Test function
async function runTests() {
    const client = new WebSocketTestClient();
    
    try {
        // Connect to server
        await client.connect();
        
        // Test Gemini
        console.log('\n=== Testing Gemini ===');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for connection
        client.sendMessage('What is the capital of France?', 'gemini');
        
        // Wait for response
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Test Copilot
        console.log('\n=== Testing Copilot ===');
        client.sendMessage('What is the largest planet in our solar system?', 'copilot');
        
        // Wait for response
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Close connection
        client.close();
        console.log('\nTests completed');
        
    } catch (error) {
        console.error('Test failed:', error);
        client.close();
    }
}

// Run the tests
runTests(); 