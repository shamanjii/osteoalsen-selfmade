import Link from "next/link";
import BreadcrumbSchema from "./BreadcrumbSchema";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav
        aria-label="Breadcrumb"
        className="pt-4 md:pt-6 pb-2 md:pb-3 px-4 sm:px-6 max-w-7xl mx-auto overflow-x-auto"
      >
        <ol className="flex items-center space-x-2 text-sm text-slate-600 flex-wrap">
        <li className="whitespace-nowrap">
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors"
          >
            Startseite
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center whitespace-nowrap">
            <span className="mx-2 text-slate-400">/</span>
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-slate-900 transition-colors truncate max-w-[200px]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-medium truncate max-w-[200px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
}
