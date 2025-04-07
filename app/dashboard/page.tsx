import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useAuth } from "@/components/AuthProvider"


export default function Dashboard() {

  return (
    <>
     
     <div className="max-w-2xl mx-auto mt-20 p-4 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Bienvenido al Dashboard</h1>
      
    </div>
    </>
    
  )
}