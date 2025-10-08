import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-4 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <ol className="flex items-center space-x-2 text-sm text-slate-600">
        <li>
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors"
          >
            Startseite
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-slate-400">/</span>
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
