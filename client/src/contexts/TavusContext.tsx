import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Replica, ConversationResponse } from '@/services/tavusService';
import { tavusApi } from '@/services/api/tavus';

interface TavusContextType {
  replica: Replica | null;
  loading: boolean;
  error: string | null;
  refreshReplica: () => Promise<void>;
  createConversation: (personaId?: string) => Promise<ConversationResponse>;
  clearError: () => void;
  resetState: () => void;
}

const TavusContext = createContext<TavusContextType | undefined>(undefined);

export const TavusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [replica, setReplica] = useState<Replica | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add error boundary for the provider itself
  const [providerError, setProviderError] = useState<string | null>(null);

  if (providerError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Provider Error</h2>
          <p className="text-muted-foreground">{providerError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-zeo-primary text-white rounded-lg hover:bg-zeo-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetState = useCallback(() => {
    setReplica(null);
    setLoading(false);
    setError(null);
  }, []);

  const fetchReplica = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tavusApi.getReplica();
      setReplica(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load AI companion';
      setError(errorMessage);
      console.error('Error fetching replica:', err);
      // Don't throw the error, just set it in state
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch with error handling
  useEffect(() => {
    try {
      fetchReplica().catch((error) => {
        // Error is already handled in fetchReplica
        console.error('Initial replica fetch failed:', error);
        setLoading(false);
      });
    } catch (error) {
      console.error('Provider initialization error:', error);
      setProviderError('Failed to initialize application');
      setLoading(false);
    }
  }, [fetchReplica]);

  const createConversation = useCallback(async (personaId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tavusApi.createConversation(personaId);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create conversation';
      setError(errorMessage);
      console.error('Error creating conversation:', err);
      throw err; // Re-throw for immediate handling in components
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshReplica = useCallback(async () => {
    await fetchReplica();
  }, [fetchReplica]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
    try {
      return {
        replica,
        loading,
        error,
        refreshReplica,
        createConversation,
        clearError,
        resetState,
      };
    } catch (error) {
      console.error('Context value creation error:', error);
      setProviderError('Failed to create context');
      return {
        replica: null,
        loading: false,
        error: 'Context error',
        refreshReplica: async () => {},
        createConversation: async () => { throw new Error('Context error'); },
        clearError: () => {},
        resetState: () => {},
      };
    }
  }, [replica, loading, error, refreshReplica, createConversation, clearError, resetState]);

  try {
    return (
      <TavusContext.Provider value={contextValue}>
        {children}
      </TavusContext.Provider>
    );
  } catch (error) {
    console.error('Provider render error:', error);
    setProviderError('Failed to render application');
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Render Error</h2>
          <p className="text-muted-foreground">Failed to render application</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-zeo-primary text-white rounded-lg hover:bg-zeo-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

export const useTavus = (): TavusContextType => {
  const context = useContext(TavusContext);
  if (context === undefined) {
    console.error('useTavus must be used within a TavusProvider');
    // Return a fallback context instead of throwing
    return {
      replica: null,
      loading: false,
      error: 'Context not available',
      refreshReplica: async () => {},
      createConversation: async () => { throw new Error('Context not available'); },
      clearError: () => {},
      resetState: () => {},
    };
  }
  return context;
};

// Error boundary for Tavus-related errors
export class TavusErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Tavus Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4 max-w-md">
            <h3 className="text-xl font-bold text-red-600">Something went wrong</h3>
            <p className="text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred with the AI Companion'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="px-4 py-2 bg-zeo-primary text-white rounded-lg hover:bg-zeo-primary/90"
              >
                Return Home
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
