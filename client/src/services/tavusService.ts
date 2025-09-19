import { TAVUS_CONFIG } from '@/config/tavus';
import { api } from '@/utils/api';

export interface Replica {
  replica_id: string;
  replica_name: string;
  thumbnail_video_url: string;
  training_progress: string;
  status: string;
  created_at: string;
  updated_at: string;
  error_message: string | null;
}

export interface ConversationResponse {
  conversation_url: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

// Helper function to create consistent error objects
const createApiError = (error: unknown, defaultMessage: string): ApiError => {
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: (error as { message: string }).message,
      status: 'status' in error ? (error as { status: number }).status : undefined,
      details: error
    };
  }
  return {
    message: defaultMessage,
    details: error
  };
};

export const tavusService = {
  async getReplica(): Promise<Replica> {
    try {
      const response = await api.get<Replica>(`/tavus/replica`);
      return response.data;
    } catch (error) {
      throw createApiError(error, 'Failed to fetch replica');
    }
  },

  async createConversation(personaId?: string): Promise<ConversationResponse> {
    try {
      const payload: { persona_id?: string } = {};
      
      // Only add persona_id if it's a valid non-empty string
      if (personaId && personaId.trim() !== '') {
        payload.persona_id = personaId;
      } else if (TAVUS_CONFIG.DEFAULT_PERSONA_ID && TAVUS_CONFIG.DEFAULT_PERSONA_ID.trim() !== '') {
        payload.persona_id = TAVUS_CONFIG.DEFAULT_PERSONA_ID;
      }
      // If no valid persona_id is provided, let Tavus use the replica's default

      const response = await api.post<ConversationResponse>(
        '/tavus/conversation',
        payload
      );
      
      return response.data;
    } catch (error) {
      throw createApiError(error, 'Failed to create conversation');
    }
  }
};
