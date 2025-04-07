// lib/api/fetch.ts
export async function fetchBackend(
    endpoint: string,
    options?: RequestInit
  ): Promise<Response> {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    
    const headers = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
  
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include' // Para manejar cookies si es necesario
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response;
  }