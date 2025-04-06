import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getContentType = (extname) => {
    const contentTypes = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
    };
    return contentTypes[extname] || 'text/html';
};

const handleRequest = async (req, res) => {
    try {
        const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        // Security check to prevent directory traversal
        if (!filePath.startsWith(__dirname)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }

        const extname = path.extname(filePath);
        const contentType = getContentType(extname);

        try {
            const content = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        } catch (error) {
            if (error.code === 'ENOENT') {
                const content = await fs.readFile(path.join(__dirname, 'index.html'));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            } else {
                throw error;
            }
        }
    } catch (error) {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
    }
};

const PORT = 3000;
const server = http.createServer(handleRequest);

// eslint-disable-next-line no-console
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${PORT}/`);
});
