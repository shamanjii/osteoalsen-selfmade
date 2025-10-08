import Link from "next/link";

interface TreatmentCTAProps {
  title?: string;
  description?: string;
}

export default function TreatmentCTA({
  title = "Termin vereinbaren",
  description = "Vereinbaren Sie jetzt einen Termin für Ihre osteopathische Behandlung in Hamburg.",
}: TreatmentCTAProps) {
  return (
    <section className="bg-slate-900 text-white py-12 rounded-xl">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-4 font-epilogue">{title}</h2>
        <p className="text-slate-300 text-lg mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/terminbuchung"
            className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-lg font-epilogue font-semibold hover:bg-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <span className="mr-2">📅</span>
            Online Termin buchen
          </Link>
          <a
            href="tel:+4917643990001"
            className="inline-flex items-center justify-center bg-slate-800 text-white px-8 py-4 rounded-lg font-epilogue font-semibold hover:bg-slate-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <span className="mr-2">📞</span>
            0176 4399 0001
          </a>
        </div>
      </div>
    </section>
  );
}
