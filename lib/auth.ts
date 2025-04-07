export function saveTokens(access: string, refresh: string) {
    localStorage.setItem("accessToken", access)
    localStorage.setItem("refreshToken", refresh)
  }
  
  export function getAccessToken() {
    return localStorage.getItem("accessToken")
  }
  
  export function clearTokens() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }

  // Estoy hay que cambiarlo despues para que se guarde seguro