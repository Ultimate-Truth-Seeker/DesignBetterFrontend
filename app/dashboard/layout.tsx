import ProtectedRoute from "@/components/ProtectedRoute"
import DashNavbar from "@/components/DashNavbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>
    <DashNavbar/>
    <main className="p-4">{children}</main>
    </ProtectedRoute>
}