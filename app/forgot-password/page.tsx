"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error" | "loading">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("http://localhost:8000/auth/password-reset/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo_electronico: email }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-xl rounded-2xl border">
      <h1 className="text-2xl font-bold mb-4">¿Olvidaste tu contraseña?</h1>
      <p className="mb-6 text-gray-600">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Enviar enlace
        </button>
      </form>
      {status === "loading" && <p className="mt-4 text-blue-600">Enviando...</p>}
      {status === "success" && (
        <p className="mt-4 text-green-600">
          Si el correo existe, recibirás un enlace para restablecer tu contraseña.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">Ocurrió un error. Intenta de nuevo.</p>
      )}
    </div>
  );
}