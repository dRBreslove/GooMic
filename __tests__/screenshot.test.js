/* global describe, test, expect, beforeAll, process */
import { WebSocketServer, WebSocket } from 'ws';

describe('Text messaging functionality', () => {
    const TEST_PORT = process.env.TEST_PORT || 8081;
    let wss;

    beforeAll(() => {
        // Set up test server
        wss = new WebSocketServer({ port: TEST_PORT });
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message);
                    if (data.type === 'text') {
                        ws.send(JSON.stringify({
                            type: 'text',
                            text: data.text,
                        }));
                    }
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            });
        });
    });

    test('should connect to WebSocket server', (done) => {
        const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
        ws.on('open', () => {
            expect(ws.readyState).toBe(WebSocket.OPEN);
            ws.close();
            done();
        });
    });

    test('should send and receive text messages', (done) => {
        const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
        const testMessage = 'Hello, World!';

        ws.on('open', () => {
            ws.send(JSON.stringify({
                type: 'text',
                text: testMessage,
            }));
        });

        ws.on('message', (message) => {
            const data = JSON.parse(message.toString());
            expect(data.type).toBe('text');
            expect(data.text).toBe(testMessage);
            ws.close();
            done();
        });
    });

    test('should handle invalid messages gracefully', (done) => {
        const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
        
        ws.on('open', () => {
            ws.send('invalid json');
            // Wait a bit to ensure no crash
            setTimeout(() => {
                expect(ws.readyState).toBe(WebSocket.OPEN);
                ws.close();
                done();
            }, 100);
        });
    });

    afterAll((done) => {
        wss.close(() => {
            done();
        });
    });
});
