import ProtectedRoute from "@/components/ProtectedRoute"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>
    <main className="p-4">{children}</main>
    </ProtectedRoute>
}