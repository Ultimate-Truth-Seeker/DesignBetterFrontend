export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to DesignBetter</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        This is your homepage. The navbar above will change based on user authentication status and role. You can
        implement your authentication logic in the layout.tsx file.
      </p>
    </div>
  )
}