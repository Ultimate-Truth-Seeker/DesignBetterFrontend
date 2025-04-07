export default function ClienteLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="bg-blue-50 min-h-screen p-4 rounded-xl shadow-inner">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Panel de Cliente</h2>
        {children}
      </div>
    )
  }