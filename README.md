# GooMic v1.0.0

A powerful Media Network Bridge that enables seamless communication and interaction between different AI models. Built with NW.js for cross-platform compatibility, GooMic creates a unified platform where AI models can communicate, share context, and collaborate in real-time through a sophisticated bridging system.

## Features

- **AI Model Bridge**: Seamless communication between different AI models (Gemini, Copilot, and more)
- **Real-time Communication**: WebSocket-based messaging system for instant model interactions
- **Message Tunneling**: Direct message transfer between AI models with visual indicators
- **Context Sharing**: Intelligent context management across different AI models
- **Bidirectional Flow**: Messages can flow in both directions between models
- **State Synchronization**: Maintains conversation state across different AI models
- **Modern UI**: Clean, responsive design with dark mode
- **Mobile Optimization**: Responsive layout for all screen sizes
- **Error Handling**: Graceful error handling and status updates
- **Status Updates**: Real-time connection and message status indicators
- **Multi-tenant Architecture**: Support for multiple users and organizations
- **Vector Database Integration**: Azure Cosmos DB with vector capabilities
- **Context Management**: Intelligent chat history handling
- **Token Optimization**: Efficient token usage and payload management

## Architecture

### Core Components
- **WebSocket Server**: Handles real-time communication between AI models
- **Message Router**: Manages message flow and tunneling between models
- **Context Manager**: Maintains conversation context across different models
- **UI Bridge**: Visual interface for monitoring and controlling model interactions
- **State Manager**: Ensures consistent state across all connected models
- **Bridge Protocol**: Standardized communication protocol between models

### Bridge Features
- **Message Translation**: Converts messages between different AI model formats
- **Context Preservation**: Maintains conversation context during model transfers
- **State Management**: Keeps track of conversation state across models
- **Error Recovery**: Handles connection issues and message failures
- **Rate Limiting**: Manages API request rates across different models
- **Load Balancing**: Distributes requests across available models

### Azure Services Integration
- **Azure OpenAI Service**: Primary AI model provider
- **Azure Cosmos DB**: Vector database for embeddings and context storage
- **Azure App Service**: Hosting and deployment platform

### Key Features
- **Message Tunneling**: Direct communication between AI models
- **Context Preservation**: Maintains conversation context across model transfers
- **Visual Indicators**: Clear representation of message flow between models
- **Token Management**: Efficient handling of API requests and responses
- **State Synchronization**: Real-time state updates across models
- **Error Recovery**: Automatic retry and fallback mechanisms

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Cloud API key for Gemini
- Azure OpenAI API key and endpoint
- Azure Cosmos DB connection string
- Azure App Service deployment credentials

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
   AZURE_COSMOS_DB_CONNECTION_STRING=your_cosmos_db_connection_string
   AZURE_APP_SERVICE_URL=your_app_service_url
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

2. Select the AI models you want to bridge between

3. Type your message in the input field and press Enter or click Send

4. Watch as messages flow between AI models with visual indicators

5. Monitor the conversation flow and context preservation

## Technical Details

- Built with NW.js for cross-platform compatibility
- WebSocket server for real-time model communication
- Modular architecture with separate AI service modules
- Responsive design with modern CSS
- Error handling and status updates
- Clean code structure following best practices
- Azure Cosmos DB integration for vector storage
- Multi-tenant data isolation
- Context window optimization
- Token usage monitoring

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

## AI Model Integration

### Supported Models
- **Gemini**: Google's advanced language model
- **Copilot**: Microsoft's AI assistant
- **Extensible**: Architecture supports adding more AI models
- **Bridge Protocol**: Standardized communication format

### Message Flow
- Direct tunneling between models
- Context preservation during transfers
- Visual indicators for message routing
- Real-time status updates
- Bidirectional communication
- State synchronization
- Error handling and recovery
- Rate limiting and load balancing

### Bridge Protocol
- Standardized message format
- Context preservation rules
- State synchronization protocol
- Error handling procedures
- Rate limiting guidelines
- Load balancing strategies

## Azure Integration

### Azure Cosmos DB
- Vector database capabilities
- Multi-tenant data isolation
- Efficient context storage
- Real-time synchronization

### Azure OpenAI Service
- GPT-4 model integration
- Embedding generation
- Token optimization
- Request management

### Azure App Service
- Scalable hosting
- Easy deployment
- Environment management
- Monitoring and logging

## Version History

### v1.0.0 (Current)
- Initial stable release
- Complete AI model bridging interface
- Real-time WebSocket communication
- Modern responsive UI
- Cross-platform compatibility
- Error handling and status updates
- Azure services integration
- Multi-tenant support
- Vector database capabilities
- Context window management
- Bridge protocol implementation
- State synchronization system
- Rate limiting and load balancing
- Error recovery mechanisms

## License

MIT License - See LICENSE file for details
