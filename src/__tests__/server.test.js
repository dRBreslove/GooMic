import { jest } from '@jest/globals';
import http from 'http';
import { createLogger } from '../utils/logger';

const logger = createLogger('server-test');

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
                wss._connectionCallback = callback;
            }
        }),
        close: jest.fn((callback) => {
            wss.clients.clear();
            if (callback) {
                callback();
            }
        }),
        _connectionCallback: null
    };
    return wss;
});

jest.mock('ws', () => ({
    WebSocket: mockWebSocket,
    WebSocketServer: mockWebSocketServer
}));

describe('WebSocket Server', () => {
    let server;
    let wss;
    let client;
    let port;

    beforeAll((done) => {
        server = http.createServer();
        wss = new mockWebSocketServer({ server });
        port = 8080;
        server.listen(port, () => {
            done();
        });
    });

    afterAll((done) => {
        const cleanup = () => {
            if (server) {
                server.close(() => {
                    done();
                });
            } else {
                done();
            }
        };

        if (wss) {
            wss.close(cleanup);
        } else {
            cleanup();
        }
    });

    beforeEach(() => {
        // Create a mock client
        client = {
            readyState: mockWebSocket.OPEN,
            send: jest.fn((data) => {
                // Simulate message handling
                if (client.onmessage) {
                    const message = typeof data === 'string' ? data : JSON.stringify(data);
                    client.onmessage({ data: message });
                }
            }),
            on: jest.fn((event, callback) => {
                if (event === 'message') {
                    client.onmessage = (data) => callback(data);
                }
            }),
            close: jest.fn((callback) => {
                client.readyState = mockWebSocket.CLOSED;
                if (callback) {
                    callback();
                }
            }),
            onmessage: null
        };

        // Add client to server's client set
        wss.clients.add(client);

        // Call the connection callback with the mock client
        if (wss._connectionCallback) {
            wss._connectionCallback(client);
        }
    });

    afterEach((done) => {
        const cleanup = () => {
            wss.clients.clear();
            done();
        };

        if (client && client.readyState === mockWebSocket.OPEN) {
            client.close(cleanup);
        } else {
            cleanup();
        }
    });

    test('should send client ID on connection', (done) => {
        client.on('message', (data) => {
            const message = JSON.parse(data);
            expect(message.type).toBe('clientId');
            expect(message.clientId).toBeDefined();
            done();
        });

        // Trigger the connection callback again to simulate the initial connection
        if (wss._connectionCallback) {
            wss._connectionCallback(client);
        }
    }, 15000);

    test('should echo text messages', (done) => {
        const testMessage = 'Hello, server!';
        client.on('message', (data) => {
            const message = JSON.parse(data);
            expect(message.type).toBe('text');
            expect(message.content).toBe(testMessage);
            done();
        });
        client.send({ type: 'text', content: testMessage });
    }, 15000);

    test('should handle Gemini AI message', (done) => {
        const testMessage = {
            type: 'aiMessage',
            content: 'Hello from Gemini!',
            source: 'gemini'
        };
        client.on('message', (data) => {
            const message = JSON.parse(data);
            expect(message.type).toBe('aiMessage');
            expect(message.content).toBe(testMessage.content);
            expect(message.source).toBe(testMessage.source);
            done();
        });
        client.send(testMessage);
    }, 15000);

    test('should handle Copilot AI message', (done) => {
        const testMessage = {
            type: 'aiMessage',
            content: 'Hello from Copilot!',
            source: 'copilot'
        };
        client.on('message', (data) => {
            const message = JSON.parse(data);
            expect(message.type).toBe('aiMessage');
            expect(message.content).toBe(testMessage.content);
            expect(message.source).toBe(testMessage.source);
            done();
        });
        client.send(testMessage);
    }, 10000);

    test('should handle AI response error', (done) => {
        const testMessage = {
            type: 'aiMessage',
            content: 'Error message',
            source: 'error'
        };
        client.on('message', (data) => {
            const message = JSON.parse(data);
            expect(message.type).toBe('error');
            expect(message.content).toBe('Failed to process AI message');
            done();
        });
        client.send(testMessage);
    }, 10000);
});
