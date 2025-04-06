# GooMic - AI Governance Platform

A modern desktop application that enables seamless interaction between Google's Gemini and Microsoft's Copilot AI models, providing a unified interface for AI governance and comparison.

## Features

- **Dual AI Interface**: Seamlessly interact with both Gemini and Copilot AI models
- **Real-time Communication**: WebSocket-based communication for instant responses
- **Flexible Message Routing**: Choose to send messages to both AIs or select a specific one
- **Message Transfer**: Transfer responses between AI models using intuitive arrow buttons
- **Modern UI**: Clean, responsive interface with dark theme and floating tooltips
- **Mobile Optimization**: Optimized for iOS devices with touch-friendly controls
- **Error Handling**: Robust error handling and automatic reconnection
- **Status Updates**: Real-time connection status and feedback

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Gemini API Key
- Azure OpenAI API Key and Endpoint

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

3. Create a `.env` file in the root directory with your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   COPILOT_API_KEY=your_azure_openai_api_key
   ```

## Development Setup

1. Start the WebSocket server:
   ```bash
   npm run server
   ```

2. Start the NW.js application:
   ```bash
   npm run start
   ```

3. For development with auto-reload:
   ```bash
   npm run dev
   ```

## Usage

1. Launch the application using `npm run start`
2. Type your message in the GooMic input area
3. Choose your target AI(s) using the radio buttons:
   - "Both AIs" to send to both Gemini and Copilot
   - "Gemini Only" to send only to Gemini
   - "Copilot Only" to send only to Copilot
4. Click "Send" or press Enter to send your message
5. View responses in the respective AI panels
6. Use the arrow buttons to transfer responses between AIs

## Project Structure

```
GooMic/
├── src/
│   ├── index.html      # Main application UI
│   ├── server.js       # WebSocket server
│   ├── ai-services.js  # AI service integrations
│   └── test-client.js  # Test client for development
├── package.json        # Project dependencies and scripts
└── .env               # Environment variables (create this)
```

## Technical Details

- **WebSocket Server**: Handles real-time communication between client and AI services
- **AI Services**: 
  - Gemini API integration using Google's Generative AI SDK
  - Azure OpenAI integration for Copilot
- **UI Framework**: NW.js for cross-platform desktop application
- **Styling**: Modern CSS with dark theme and responsive design

## AI Services Configuration

### Gemini
- Model: gemini-2.0-flash
- API Version: Latest
- Configuration via GEMINI_API_KEY environment variable

### Azure OpenAI (Copilot)
- Endpoint: https://goomic.openai.azure.com
- Model: gpt-4
- API Version: 2024-02-15-preview
- Configuration via COPILOT_API_KEY environment variable

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
