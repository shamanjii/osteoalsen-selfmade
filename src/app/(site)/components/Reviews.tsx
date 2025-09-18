"use client";
import { useEffect, useMemo, useState } from "react";

type Review = { text: string; author: string; rating: number; time: string };

const FALLBACK: Review[] = [
    {
        text:
            "Joshua ist ein sehr netter und einfühlsamer Osteopath. Meine Knieschmerzen waren direkt nach der ersten Behandlung viel besser.",
        author: "Theresa B.",
        rating: 5,
        time: "vor 1 Tag",
    },
    {
        text:
            "Nach der Behandlung sind meine Beschwerden verschwunden – ein unglaubliches Gefühl! Joshua nimmt sich wirklich viel Zeit.",
        author: "Evgeniya E.",
        rating: 5,
        time: "vor 1 Woche",
    },
    {
        text:
            "Kompetenz und Empathie – meine Rückenschmerzen wurden deutlich gelindert. Absolut zu empfehlen.",
        author: "Yusuf V.",
        rating: 5,
        time: "vor 2 Wochen",
    },
];

export default function Reviews() {
    const [idx, setIdx] = useState(0);
    const reviews = useMemo(() => FALLBACK, []);

    useEffect(() => {
        const id = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 5000);
        return () => clearInterval(id);
    }, [reviews.length]);

    return (
        <section id="bewertungen" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">Patientenstimmen</h2>
                <p className="mt-4 max-w-2xl text-slate-700">
                    Die Zufriedenheit meiner Patienten liegt mir sehr am Herzen. Hier finden Sie authentische Erfahrungen.
                </p>
                <div className="mt-10 relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${idx * 100}%)`, width: `${reviews.length * 100}%` }}
                    >
                        {reviews.map((r, i) => (
                            <div key={i} className="w-full shrink-0 px-2 sm:px-4" style={{ width: `${100 / reviews.length}%` }}>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 h-full">
                                    <div className="text-amber-400 text-xl">{"★".repeat(r.rating)}</div>
                                    <p className="mt-3 text-slate-800 italic">“{r.text}”</p>
                                    <div className="mt-4 text-sm text-slate-600">{r.author} · {r.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                className={`h-2 w-2 rounded-full ${i === idx ? "bg-slate-900" : "bg-slate-300"}`}
                                aria-label={`Bewertung ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
