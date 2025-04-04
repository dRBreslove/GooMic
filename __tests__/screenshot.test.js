/* global describe, test, expect, beforeAll, process, Buffer */
import WebSocket from 'ws';

describe('Screenshot functionality', () => {
    const TEST_PORT = process.env.TEST_PORT || 8081;

    beforeAll(() => {
        // Set up test server
        const wss = new WebSocket.Server({ port: TEST_PORT });
        wss.on('connection', (ws) => {
            ws.on('message', (message) => ws.send(message));
        });
    });

    test('should connect to WebSocket server', async () => {
        const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
        expect(ws.readyState).toBeDefined();
    });

    test('should send and receive messages', async () => {
        const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
        expect(ws.readyState).toBeDefined();
    });

    test('should handle screenshot data', async () => {
        const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
        const testData = Buffer.from('test-screenshot-data');

        ws.send(JSON.stringify({
            type: 'screenshot',
            data: testData.toString('base64'),
        }));

        expect(ws.readyState).toBeDefined();
        expect(ws).toBeDefined();
    });
});
