import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.goomic.app',
    appName: 'GooMic',
    webDir: 'www',
    server: {
        androidScheme: 'https',
        cleartext: true,
    },
    ios: {
        contentInset: 'always',
        backgroundColor: '#ffffff',
    },
};

export default config;
