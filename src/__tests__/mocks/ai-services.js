const { createLogger } = require('../../utils/logger');

const logger = createLogger('AIServicesMock');

// Mock responses for different AI types
const mockResponses = {
    gemini: {
        content: "Hello! I'm Gemini, and I'm here to help you.",
        source: 'gemini'
    },
    copilot: {
        content: "Hi there! I'm Copilot, and I'm ready to assist you.",
        source: 'copilot'
    },
    goomic: {
        content: "Greetings! I'm GooMic, and I'm here to help you with both Gemini and Copilot.",
        source: 'goomic',
        tunnelTo: 'copilot'
    }
};

async function getGeminiResponse(prompt) {
    logger.info('Mock: Sending request to Gemini API...');
    return mockResponses.gemini.content;
}

async function getAzureOpenAIResponse(prompt) {
    logger.info('Mock: Sending request to Azure OpenAI API...');
    return mockResponses.copilot.content;
}

async function getAIResponse(prompt, aiType) {
    logger.info(`Mock: Getting AI response for type: ${aiType}`);
    
    if (!aiType) {
        throw new Error('AI type is required');
    }

    // Return mock response based on AI type
    const response = mockResponses[aiType.toLowerCase()];
    if (!response) {
        throw new Error(`Unsupported AI type: ${aiType}`);
    }

    return response;
}

module.exports = {
    getGeminiResponse,
    getAzureOpenAIResponse,
    getAIResponse
}; 