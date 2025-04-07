export function Card({
    title,
    children,
    danger = false,
  }: {
    title: string;
    children: React.ReactNode;
    danger?: boolean;
  }) {
    return (
      <div className={`border rounded-lg p-6 ${danger ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium mb-4 ${danger ? 'text-red-600' : 'text-gray-800'}`}>
          {title}
        </h2>
        {children}
      </div>
    );
  }