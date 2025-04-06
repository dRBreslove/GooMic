# GooMic v1.0.0

A modern desktop application that enables seamless interaction between Google's Gemini and Microsoft's Copilot AI models. Built with NW.js for cross-platform compatibility.

## Features

- **Dual AI Interface**: Side-by-side chat windows for Gemini and Copilot
- **Real-time Communication**: WebSocket-based messaging system
- **Flexible Message Routing**: Send messages to either or both AI models
- **Message Transfer**: Transfer responses between AI models
- **Modern UI**: Clean, responsive design with dark mode
- **Mobile Optimization**: Responsive layout for all screen sizes
- **Error Handling**: Graceful error handling and status updates
- **Status Updates**: Real-time connection and message status indicators

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Cloud API key for Gemini
- Azure OpenAI API key for Copilot

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

3. Configure environment variables:
   Create a `.env` file in the root directory with:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key
   AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
   ```

## Development Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Run linting:
   ```bash
   npm run lint
   ```

## Usage

1. Launch the application:
   ```bash
   npm run start
   ```

2. Select the AI model(s) you want to interact with using the checkboxes

3. Type your message in the input field and press Enter or click Send

4. View responses in the respective chat windows

5. Transfer responses between AIs using the transfer buttons

## Technical Details

- Built with NW.js for cross-platform compatibility
- WebSocket server for real-time communication
- Modular architecture with separate AI service modules
- Responsive design with modern CSS
- Error handling and status updates
- Clean code structure following best practices

## Project Structure

```
GooMic/
├── src/
│   ├── index.html          # Main application UI
│   ├── server.js           # WebSocket server
│   ├── ai-services.js      # AI service implementations
│   └── test-client.js      # Test client implementation
├── ios/
│   └── App/
│       └── App/
│           └── public/     # iOS-specific files
├── www/                    # Web-specific files
├── package.json           # Project configuration
└── README.md             # Project documentation
```

## AI Service Configurations

### Gemini
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- API Version: v1beta
- Model: gemini-pro

### Azure OpenAI
- Endpoint: `https://your-resource.openai.azure.com/openai/deployments/gpt-4/chat/completions`
- API Version: 2024-02-15-preview
- Model: gpt-4

## Version History

### v1.0.0 (Current)
- Initial stable release
- Complete dual AI interface
- Real-time WebSocket communication
- Modern responsive UI
- Cross-platform compatibility
- Error handling and status updates

## License

MIT License - See LICENSE file for details
