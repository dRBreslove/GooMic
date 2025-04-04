# GooMic - AI Assistant Text Transfer Tool

A simple tool for transferring text between Google's Gemini and Microsoft's Copilot AI assistants.

## Features

- Text transfer between Gemini and Copilot
- Real-time WebSocket communication
- Simple and intuitive interface
- Secure text handling

## Prerequisites

- Node.js (v20.5.0 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/GooMic.git
cd GooMic
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the WebSocket signaling server:
```bash
node server.js
```

2. Start the HTTP server:
```bash
node serve.js
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

4. To transfer text between AI assistants:
   - Copy text from one AI assistant
   - Paste it into the text input field
   - Click "Send to Gemini" or "Send to Copilot"
   - The text will be copied to the clipboard on the receiving end
   - Paste the text into the target AI assistant's prompt

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Testing

The test suite includes:
- WebSocket connection tests
- Message handling tests
- Text transfer functionality tests

Test coverage reports are generated in the `coverage` directory.

## License

MIT License - see LICENSE file for details 