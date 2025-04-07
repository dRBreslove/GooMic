const http = require('http');
const { createLogger } = require('../utils/logger');

const logger = createLogger('WWWServerTest');

// Mock WebSocket and WebSocketServer
const mockWebSocket = {
    OPEN: 1,
    CONNECTING: 0,
    CLOSING: 2,
    CLOSED: 3
};

const mockWebSocketServer = jest.fn().mockImplementation(({ server }) => {
    const wss = {
        clients: new Set(),
        on: jest.fn((event, callback) => {
            if (event === 'connection') {
                // Store the connection callback to call it later with mock clients
                wss._connectionCallback = callback;
            }
        }),
        close: jest.fn((callback) => callback && callback()),
        _connectionCallback: null
    };
    return wss;
});

jest.mock('ws', () => ({
    WebSocket: mockWebSocket,
    WebSocketServer: mockWebSocketServer
}));

describe('WebSocket Server', () => {
    let wss;
    let server;
    let client;
    let serverUrl;

    beforeAll((done) => {
        server = http.createServer();
        wss = new mockWebSocketServer({ server });
        server.listen(0, () => { // Use port 0 to let the OS assign a random available port
            const address = server.address();
            serverUrl = `ws://localhost:${address.port}`;
            logger.info(`Test server started on port ${address.port}`);
            done();
        });
    });

    afterAll((done) => {
        if (wss) wss.close(() => {
            server.close(() => {
                logger.info('Test server closed');
                done();
            });
        });
    });

    beforeEach(() => {
        // Create a mock client
        client = {
            readyState: mockWebSocket.OPEN,
            send: jest.fn(),
            on: jest.fn((event, callback) => {
                if (event === 'message') {
                    client.onmessage = (data) => callback(data);
                }
            }),
            close: jest.fn(),
            onmessage: null
        };

        // Add client to server's client set
        wss.clients.add(client);

        // Call the connection callback with the mock client
        if (wss._connectionCallback) {
            wss._connectionCallback(client);
        }
    });

    afterEach(() => {
        if (client && client.readyState === mockWebSocket.OPEN) {
            client.close();
        }
        wss.clients.clear();
    });

    test('should connect to WebSocket server', () => {
        expect(client.readyState).toBe(mockWebSocket.OPEN);
    });

    test('should receive echo response', (done) => {
        const testMessage = 'Hello, WebSocket!';
        
        client.on('message', (data) => {
            expect(data.toString()).toBe(testMessage);
            done();
        });

        client.send(testMessage);
    });
});
