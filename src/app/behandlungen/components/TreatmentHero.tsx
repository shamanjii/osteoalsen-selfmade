interface TreatmentHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function TreatmentHero({
  title,
  subtitle,
  description,
}: TreatmentHeroProps) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-4">
            {subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue">
            {title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
