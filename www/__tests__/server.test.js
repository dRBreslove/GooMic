const WebSocket = require('ws');
const http = require('http');

describe('WebSocket Server', () => {
    let ws;
    let server;

    beforeAll((done) => {
    // Create a test server
        server = http.createServer();
        const wss = new WebSocket.Server({ server });

        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                ws.send(message.toString());
            });
        });

        server.listen(8081, () => {
            console.log('Test server started on port 8081');
            done();
        });
    });

    afterAll((done) => {
        server.close(() => {
            console.log('Test server closed');
            done();
        });
    });

    beforeEach((done) => {
        ws = new WebSocket('ws://localhost:8081');
        ws.on('open', done);
    });

    afterEach((done) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
        done();
    });

    test('should connect to WebSocket server', () => {
        expect(ws.readyState).toBe(WebSocket.OPEN);
    });

    test('should receive echo response', (done) => {
        const testMessage = 'Hello, WebSocket!';

        ws.on('message', (data) => {
            expect(data.toString()).toBe(testMessage);
            done();
        });

        ws.send(testMessage);
    });
});
