// lib/api.ts
export async function registerUser(data: {
    email: string
    password: string
    confirmPassword: string
    name: string
    role: string
  }) {
    if (data.password != data.confirmPassword) {
        throw new Error("Error en el registro: las contraseñas no coinciden")
    }
    const res = await fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo_electronico: data.email,
        nombre: data.name,
        password: data.password,
        rol: data.role
      }),
    })
  
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.detail || "Error en el registro")
    }
  
    return await res.json()
  }


  export async function activateAccount(rawToken: string) {
    const decoded = decodeURIComponent(rawToken)
    const [email, token] = decoded.split(":")
  
    if (!email || !token) {
      throw new Error("Token de activación inválido")
    }
  
    const res = await fetch(
      `http://localhost:8000/auth/activate/${email}:${token}/`,
      {
        method: "GET",
      }
    )
  
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.detail || "Error al activar la cuenta")
    }
  
    return await res.json()
  }
 
  export async function loginUser(data: { email: string; password: string }) {
    const res = await fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo_electronico: data.email,
        password: data.password,
      }),
    })
  
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.detail || "Error al iniciar sesión")
    }
  
    return await res.json() // { access: "...", refresh: "..." }
  }
  export async function refreshToken(refresh: string) {
    const res = await fetch("http://localhost:8000/auth/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    })
  
    if (!res.ok) {
      throw new Error("No se pudo refrescar el token")
    }
  
    return await res.json() // { access: "nuevo token" }
  }