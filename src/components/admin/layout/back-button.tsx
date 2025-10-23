import Link from "next/link";

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
}

export function BackButton({ href, children }: BackButtonProps) {
  return (
    <div className="text-center mt-12">
      <Link 
        href={href}
        className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
      >
        {children}
      </Link>
    </div>
  );
}
