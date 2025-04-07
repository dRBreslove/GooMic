const { format } = require('util');

class Semaphore {
    constructor (permits) {
        this.permits = permits;
        this.queue = [];
        this.used = 0;
    }

    async acquire () {
        if (this.used < this.permits) {
            this.used++;
            return true;
        }
        return new Promise(resolve => {
            this.queue.push(resolve);
        });
    }

    release () {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            this.used++;
            next(true);
        } else {
            this.used--;
        }
    }
}

// Create a semaphore with 3 permits (allows 3 concurrent log operations)
const logSemaphore = new Semaphore(3);

function createLogger (context) {
    const timestamp = () => new Date().toISOString();
    const formatMessage = (level, message, ...args) => {
        const formattedMessage = format(message, ...args);
        return `[${timestamp()}] [${level}] [${context}] ${formattedMessage}`;
    };

    const log = async (level, message, ...args) => {
        const formattedMessage = formatMessage(level, message, ...args);

        try {
            await logSemaphore.acquire();

            switch (level) {
            case 'debug':
                console.debug(formattedMessage);
                break;
            case 'info':
                console.info(formattedMessage);
                break;
            case 'warn':
                console.warn(formattedMessage);
                break;
            case 'error':
                console.error(formattedMessage);
                break;
            }
        } finally {
            logSemaphore.release();
        }
    };

    return {
        debug: (message, ...args) => log('debug', message, ...args),
        info: (message, ...args) => log('info', message, ...args),
        warn: (message, ...args) => log('warn', message, ...args),
        error: (message, ...args) => log('error', message, ...args),
    };
}

module.exports = { createLogger };
