"use client";
import { getBaseUrl } from "@/lib/api/base-url";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<null | "success" | "error" | "loading">(null);

  const uid = params?.uid as string;
  const token = params?.token as string;
  const baseUrl = getBaseUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const response = await fetch(`${baseUrl}/auth/password-reset/confirm/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        token,
        nueva_contraseña: password,
      }),
    });

    if (response.ok) {
      setStatus("success");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 shadow-xl rounded-2xl border">
      <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Cambiar contraseña
        </button>
      </form>
      {status === "loading" && <p className="mt-2 text-blue-600">Procesando...</p>}
      {status === "success" && <p className="mt-2 text-green-600">¡Contraseña actualizada! Redirigiendo...</p>}
      {status === "error" && <p className="mt-2 text-red-600">Error al cambiar la contraseña. El enlace pudo haber expirado.</p>}
    </div>
  );
}