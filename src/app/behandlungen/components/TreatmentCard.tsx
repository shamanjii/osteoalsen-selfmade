import Link from "next/link";

interface TreatmentCardProps {
  title: string;
  description: string;
  href: string;
  keywords?: string[];
}

export default function TreatmentCard({
  title,
  description,
  href,
  keywords = [],
}: TreatmentCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue group-hover:text-slate-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center text-slate-900 font-medium group-hover:gap-2 transition-all">
          <span>Mehr erfahren</span>
          <span className="ml-1 group-hover:ml-0 transition-all">→</span>
        </div>
      </div>
    </Link>
  );
}
