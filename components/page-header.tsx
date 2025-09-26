interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b bg-background px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
