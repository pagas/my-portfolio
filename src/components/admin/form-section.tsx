interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="bg-accent/30 rounded-xl p-8 border border-border">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
