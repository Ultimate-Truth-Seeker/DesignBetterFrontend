import { getBaseUrl } from "./base-url";

// lib/api/fetch.ts
export async function fetchBackend(
    endpoint: string,
    options?: RequestInit
  ): Promise<Response> {
    const baseUrl = getBaseUrl();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
  
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
      //credentials: 'include' // Para manejar cookies si es necesario
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response;
  }