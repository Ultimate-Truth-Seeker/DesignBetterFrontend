export default function LoadingSkeleton() {
    return (
      <div className="space-y-4">
        {/* Simula tarjetas de pedidos */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-24 animate-pulse"></div>
        ))}
      </div>
    );
  }