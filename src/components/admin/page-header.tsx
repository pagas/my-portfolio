interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl sm:text-6xl font-bold mb-4">
        <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}
