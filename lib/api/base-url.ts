export function getBaseUrl(){
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://designbetterbackend.onrender.com';
    return baseUrl
}