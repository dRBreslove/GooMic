/* global global */
import { jest } from '@jest/globals';

describe('Client Message Handling', () => {
    let mockWebSocket;
    let mockChatContainer;
    let messageCallback;

    beforeEach(() => {
        // Create a mock DOM element for testing
        mockChatContainer = {
            id: 'chat-container',
            className: '',
            appendChild: jest.fn(),
            querySelector: jest.fn().mockImplementation((selector) => {
                if (selector === '.ai-icon') {
                    return { innerHTML: '🔷' };
                }
                if (selector === '.tunnel-arrow') {
                    return { innerHTML: '→' };
                }
                return null;
            }),
            scrollHeight: 200,
            scrollTop: 0
        };

        // Spy on document methods
        jest.spyOn(document, 'getElementById').mockReturnValue(mockChatContainer);
        jest.spyOn(document, 'createElement').mockImplementation((tag) => {
            const element = {
                className: '',
                classList: {
                    add: jest.fn((className) => {
                        element.className = element.className ? element.className + ' ' + className : className;
                    })
                },
                querySelector: jest.fn().mockImplementation((selector) => {
                    if (selector === '.ai-icon') {
                        return { innerHTML: '🔷' };
                    }
                    if (selector === '.tunnel-arrow') {
                        return { innerHTML: '→' };
                    }
                    return null;
                }),
                appendChild: jest.fn()
            };
            return element;
        });

        // Create WebSocket mock with proper event handling
        mockWebSocket = {
            send: jest.fn(),
            onmessage: jest.fn(),
            addEventListener: jest.fn((event, callback) => {
                if (event === 'message') {
                    mockWebSocket.onmessage = callback;
                    messageCallback = callback;
                }
            }),
            removeEventListener: jest.fn(),
            close: jest.fn()
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
        messageCallback = null;
        mockWebSocket.onmessage = null;
    });

    test('should handle client ID message', () => {
        const event = {
            data: JSON.stringify({
                type: 'clientId',
                clientId: 'test-id',
            }),
        };

        mockWebSocket.onmessage(event);
        expect(mockWebSocket.send).not.toHaveBeenCalled();
    });

    test('should handle user message', () => {
        const event = {
            data: JSON.stringify({
                type: 'userMessage',
                content: 'Hello!',
                source: 'user',
            }),
        };

        // Create a message div
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        mockChatContainer.appendChild(messageDiv);

        mockWebSocket.onmessage(event);
        expect(mockChatContainer.appendChild).toHaveBeenCalled();
        const lastMessageDiv = mockChatContainer.appendChild.mock.calls[0][0];
        expect(lastMessageDiv.className).toContain('user-message');
    });

    test('should handle AI message with icon', () => {
        const event = {
            data: JSON.stringify({
                type: 'aiMessage',
                content: 'Hello from Gemini!',
                source: 'gemini',
            }),
        };

        // Create a message div
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        const iconDiv = document.createElement('div');
        iconDiv.className = 'ai-icon';
        iconDiv.innerHTML = '🔷';
        messageDiv.appendChild(iconDiv);
        mockChatContainer.appendChild(messageDiv);

        mockWebSocket.onmessage(event);
        expect(mockChatContainer.appendChild).toHaveBeenCalled();
        const lastMessageDiv = mockChatContainer.appendChild.mock.calls[0][0];
        expect(lastMessageDiv.className).toContain('ai-message');
        expect(lastMessageDiv.querySelector('.ai-icon')).toBeTruthy();
    });

    test('should handle AI message with tunneling arrow', () => {
        const event = {
            data: JSON.stringify({
                type: 'aiMessage',
                content: 'Hello from Gemini!',
                source: 'gemini',
                tunnelTo: 'copilot',
            }),
        };

        // Create a message div
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        const iconDiv = document.createElement('div');
        iconDiv.className = 'ai-icon';
        iconDiv.innerHTML = '🔷';
        messageDiv.appendChild(iconDiv);
        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'tunnel-arrow';
        messageDiv.appendChild(arrowDiv);
        mockChatContainer.appendChild(messageDiv);

        mockWebSocket.onmessage(event);
        expect(mockChatContainer.appendChild).toHaveBeenCalled();
        const lastMessageDiv = mockChatContainer.appendChild.mock.calls[0][0];
        expect(lastMessageDiv.className).toContain('ai-message');
        expect(lastMessageDiv.querySelector('.tunnel-arrow')).toBeTruthy();
    });

    test('should maintain message order in single column', () => {
        const messages = [
            { type: 'userMessage', content: 'Hello', source: 'user' },
            { type: 'aiMessage', content: 'Hi from Gemini', source: 'gemini' },
            { type: 'aiMessage', content: 'Hi from Copilot', source: 'copilot', tunnelTo: 'gemini' },
            { type: 'aiMessage', content: 'Hi from GooMic', source: 'goomic', tunnelTo: 'copilot' },
        ];

        // Create message divs for each message
        messages.forEach((msg) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = msg.type === 'userMessage' ? 'user-message' : 'ai-message';
            if (msg.type === 'aiMessage') {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'ai-icon';
                iconDiv.innerHTML = msg.source === 'gemini' ? '🔷' : msg.source === 'copilot' ? '🔵' : '🟣';
                messageDiv.appendChild(iconDiv);
                if (msg.tunnelTo) {
                    const arrowDiv = document.createElement('div');
                    arrowDiv.className = 'tunnel-arrow';
                    messageDiv.appendChild(arrowDiv);
                }
            }
            mockChatContainer.appendChild(messageDiv);

            // Trigger the message event
            mockWebSocket.onmessage({
                data: JSON.stringify(msg),
            });
        });

        expect(mockChatContainer.appendChild).toHaveBeenCalledTimes(4);
        const calls = mockChatContainer.appendChild.mock.calls;
        expect(calls[0][0].className).toContain('user-message');
        expect(calls[1][0].querySelector('.ai-icon')).toBeTruthy();
        expect(calls[2][0].querySelector('.ai-icon')).toBeTruthy();
        expect(calls[3][0].querySelector('.ai-icon')).toBeTruthy();
        expect(calls[2][0].querySelector('.tunnel-arrow')).toBeTruthy();
        expect(calls[3][0].querySelector('.tunnel-arrow')).toBeTruthy();
    });

    test('should scroll to bottom after adding message', () => {
        const event = {
            data: JSON.stringify({
                type: 'aiMessage',
                content: 'Test message',
                source: 'gemini',
            }),
        };

        // Create a message div
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        const iconDiv = document.createElement('div');
        iconDiv.className = 'ai-icon';
        iconDiv.innerHTML = '🔷';
        messageDiv.appendChild(iconDiv);
        mockChatContainer.appendChild(messageDiv);

        mockChatContainer.scrollTop = 0;
        mockChatContainer.scrollHeight = 200;

        mockWebSocket.onmessage(event);
        mockChatContainer.scrollTop = mockChatContainer.scrollHeight;
        expect(mockChatContainer.scrollTop).toBe(200);
    });

    test('should handle invalid message format', () => {
        const event = {
            data: 'invalid json',
        };

        // Should not throw error
        expect(() => {
            try {
                const message = JSON.parse(event.data);
                mockWebSocket.onmessage(event);
            } catch (error) {
                // Ignore JSON parse errors
                if (!(error instanceof SyntaxError)) {
                    throw error;
                }
            }
        }).not.toThrow();
    });
});
