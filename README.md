# GooMic - AI Governance Platform

A web-based platform that enables seamless communication between AI assistants (Gemini and Copilot) for enhanced AI governance and collaboration.

## Features

- **Dual AI Interface**: Access both Gemini and Copilot simultaneously in a split-screen layout
- **Seamless Text Transfer**: Easily copy and paste text between AI assistants
- **Mobile-Optimized**: Designed specifically for iOS devices with native-like experience
- **Real-time Communication**: WebSocket-based messaging system for instant text transfer
- **Responsive Design**: Adapts to both portrait and landscape orientations
- **Modern UI**: Clean interface with iOS-style blur effects and animations

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- iOS device or simulator with a modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/goomic.git
cd goomic
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

This will start:
- WebSocket server on port 8080
- HTTP server on port 3000

Access the app by opening `http://localhost:3000/ios.html` in your iOS device's browser.

## Usage

1. Open the app in your iOS device's browser
2. You'll see two panels:
   - Left panel: Gemini AI
   - Right panel: Copilot AI
3. To transfer text between assistants:
   - Copy text from one AI assistant
   - Paste it into the text input field at the bottom
   - Click the appropriate button to send it to the other AI assistant
   - The text will be automatically copied to the clipboard
   - Paste the text into the target AI assistant's prompt

## Project Structure

```
goomic/
├── src/
│   ├── ios.html      # Main web interface
│   └── server.js     # WebSocket server
├── package.json      # Project configuration
└── README.md         # This file
```

## Technical Details

- Built with vanilla JavaScript for maximum compatibility
- Uses WebSocket for real-time communication
- Implements iOS-specific meta tags for native-like experience
- Responsive design with CSS Grid and Flexbox
- Secure text transfer with clipboard API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
