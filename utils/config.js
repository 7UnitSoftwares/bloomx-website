import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() || {};

// Server-side logger that will be visible in ArgoCD
const serverLogger = {
    info: (...args) => {
        if (typeof window === 'undefined') {
            console.log('[BLOOM-SERVER]', new Date().toISOString(), ...args);
        }
    },
    error: (...args) => {
        if (typeof window === 'undefined') {
            console.error('[BLOOM-SERVER]', new Date().toISOString(), ...args);
        }
    }
};

export const getApiBaseUrl = () => {
    if (typeof window === 'undefined') {
        // Server-side
        const value = serverRuntimeConfig?.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
        serverLogger.info('API Base URL:', value ? 'Found' : 'Missing');
        return value;
    }
    // Client-side
    return publicRuntimeConfig?.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
};

export const getApiKey = () => {
    if (typeof window === 'undefined') {
        // Server-side
        const value = serverRuntimeConfig?.NEXT_PUBLIC_API_KEY || process.env.NEXT_PUBLIC_API_KEY;
        serverLogger.info('API Key:', value ? 'Found' : 'Missing');
        return value;
    }
    // Client-side
    return publicRuntimeConfig?.NEXT_PUBLIC_API_KEY || process.env.NEXT_PUBLIC_API_KEY;
};

// Validate environment variables
export const validateEnv = () => {
    serverLogger.info('Starting environment validation...');
    
    const apiBaseUrl = getApiBaseUrl();
    const apiKey = getApiKey();

    if (!apiBaseUrl || !apiKey) {
        serverLogger.error('Missing required environment variables:');
        if (!apiBaseUrl) serverLogger.error('- NEXT_PUBLIC_API_BASE_URL is missing');
        if (!apiKey) serverLogger.error('- NEXT_PUBLIC_API_KEY is missing');
        
        // Log the full environment for debugging (excluding sensitive values)
        serverLogger.info('Environment check:', {
            NODE_ENV: process.env.NODE_ENV,
            hasApiBaseUrl: !!apiBaseUrl,
            hasApiKey: !!apiKey,
            runtimeConfig: {
                hasPublicConfig: !!publicRuntimeConfig,
                hasServerConfig: !!serverRuntimeConfig
            }
        });
        
        return false;
    }

    serverLogger.info('Environment validation successful');
    return true;
}; 