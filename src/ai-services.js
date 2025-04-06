const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Azure OpenAI configuration
const AZURE_OPENAI_ENDPOINT = 'https://goomic.openai.azure.com';
const AZURE_API_KEY = process.env.COPILOT_API_KEY;
const AZURE_DEPLOYMENT_NAME = 'gpt-4';
const AZURE_API_VERSION = '2024-02-15-preview';

async function getGeminiResponse (prompt) {
    try {
        console.log('Sending request to Gemini API...');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log('Got response from Gemini API');
        return response.text();
    } catch (error) {
        console.error('Gemini API Error Details:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data,
        });
        throw new Error(`Gemini API Error: ${error.message}`);
    }
}

async function getAzureOpenAIResponse (prompt) {
    try {
        console.log('Sending request to Azure OpenAI API...');
        const response = await axios.post(
            `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_API_VERSION}`,
            {
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 1000,
            },
            {
                headers: {
                    'api-key': AZURE_API_KEY,
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log('Got response from Azure OpenAI API');
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Azure OpenAI API Error Details:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data,
        });
        throw new Error(`Azure OpenAI API Error: ${error.message}`);
    }
}

async function getAIResponse (prompt, aiType) {
    try {
        console.log(`Getting response from ${aiType} for prompt:`, prompt);
        switch (aiType.toLowerCase()) {
        case 'gemini':
            return await getGeminiResponse(prompt);
        case 'copilot':
            return await getAzureOpenAIResponse(prompt);
        default:
            throw new Error('Unsupported AI type');
        }
    } catch (error) {
        console.error('AI Service Error:', error);
        return `Error: ${error.message}`;
    }
}

module.exports = {
    getAIResponse,
};
