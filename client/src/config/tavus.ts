export const TAVUS_CONFIG = {
  API_KEY: import.meta.env.VITE_TAVUS_API_KEY || '5f50263c80654c5bb8613a0e7a90f029',
  API_BASE_URL: import.meta.env.VITE_TAVUS_API_URL || 'https://tavusapi.com/v2',
  REPLICA_ID: import.meta.env.VITE_TAVUS_REPLICA_ID || 'r6ae5b6efc9d',
  DEFAULT_PERSONA_ID: import.meta.env.VITE_TAVUS_DEFAULT_PERSONA_ID || ''
};
