/* global jest, console */

// Mock console methods to reduce noise in tests
console.log = jest.fn();
console.error = jest.fn();
console.warn = jest.fn();

// Mock WebSocket
global.WebSocket = jest.fn().mockImplementation(() => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    send: jest.fn(),
    close: jest.fn()
}));

// Set up location properties
if (window.location) {
    window.location = {
        ...window.location,
        hostname: 'localhost',
        port: '8080'
    };
}

// Increase timeout for all tests
jest.setTimeout(10000);
