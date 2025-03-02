import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Mock response utility for testing
const mockResponse = (data?: any) => ({
  data: data || null,
  error: null,
  status: 200,
  statusText: 'OK',
});

// Mock Supabase client for development/testing
const createMockClient = () => {
  return {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: async (column: string, value: any) => {
          if (table === 'properties') {
            const mockProperty = (await import('@/mocks/properties')).mockProperties.find(p => p.id === value);
            return mockResponse(mockProperty);
          }
          return mockResponse();
        },
        order: (column: string, options: any) => ({
          single: async () => mockResponse(),
        }),
        gte: (column: string, value: any) => ({
          order: (column: string, options: any) => mockResponse(),
        }),
        ilike: (column: string, value: any) => ({
          order: (column: string, options: any) => mockResponse(),
        }),
      }),
      order: (column: string, options: any) => ({
        eq: (column: string, value: any) => mockResponse(),
      }),
      ilike: (column: string, value: any) => ({
        order: (column: string, options: any) => mockResponse(),
      }),
      insert: (data: any) => ({
        select: () => ({
          single: async () => mockResponse({ id: '1', ...data[0] }),
        }),
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => mockResponse(),
      }),
      delete: () => ({
        eq: (column: string, value: any) => mockResponse(),
      }),
    }),
  };
};

const supabaseUrl = 'https://umlmcuytyqakgbmpgphu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbG1jdXl0eXFha2dibXBncGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NjI5MDMsImV4cCI6MjA1NjQzODkwM30.NleMkFY3ox5bycWp7nUfasU0u-qpFik_sOdx25s9fAY';

// Use mock client in development, real client in production
const supabase = process.env.NODE_ENV === 'development' 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === 'web',
      },
    });

export default supabase;