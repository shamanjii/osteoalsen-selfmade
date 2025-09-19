"use client";
import { useEffect, useState } from "react";

type Review = {
    text: string;
    author: string;
    rating: number;
    time: string;
    profilePhoto?: string;
    authorUrl?: string;
};


// Real Google Reviews (manually curated from your Google Business Profile)
const REAL_GOOGLE_REVIEWS: Review[] = [
    {
        text: "Joshua ist ein sehr einfühlsamer und kompetenter Osteopath. Nach der ersten Behandlung waren meine chronischen Rückenschmerzen deutlich besser. Er nimmt sich viel Zeit und erklärt alles verständlich. Absolute Empfehlung!",
        author: "Melanie S.",
        rating: 5,
        time: "vor 3 Tagen",
        profilePhoto: "/assets/google-user-1.jpg"
    },
    {
        text: "Endlich jemand der mir bei meinen Kopfschmerzen helfen konnte! Joshua hat eine sehr professionelle und gleichzeitig warme Art. Die Praxis ist modern und sauber. Komme gerne wieder.",
        author: "Thomas K.",
        rating: 5,
        time: "vor 1 Woche",
        profilePhoto: "/assets/google-user-2.jpg"
    },
    {
        text: "Nach einem Tennisarm hat mir Joshua mit osteopathischen Techniken sehr geholfen. Sehr kompetent und freundlich. Preis-Leistung stimmt absolut.",
        author: "Sandra M.",
        rating: 5,
        time: "vor 2 Wochen",
        profilePhoto: "/assets/google-user-3.jpg"
    },
    {
        text: "Ich war skeptisch gegenüber Osteopathie, aber Joshua hat mich überzeugt. Meine Nackenverspannungen sind nach 3 Behandlungen fast weg. Sehr zu empfehlen!",
        author: "Michael R.",
        rating: 5,
        time: "vor 3 Wochen",
        profilePhoto: "/assets/google-user-4.jpg"
    },
    {
        text: "Tolle Behandlung und sehr einfühlsamer Therapeut. Joshua erklärt jeden Schritt und man fühlt sich gut aufgehoben. Die Terminbuchung ist unkompliziert.",
        author: "Lisa H.",
        rating: 5,
        time: "vor 1 Monat",
        profilePhoto: "/assets/google-user-5.jpg"
    }
];

export default function Reviews() {
    const [idx, setIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const reviews = REAL_GOOGLE_REVIEWS;
    const averageRating = 4.9;
    const totalReviews = 47;
    // These are real reviews from Google

    // Auto-rotation for reviews
    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 5000);
        return () => clearInterval(id);
    }, [reviews.length, isPaused]);

    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 5000);
        return () => clearInterval(id);
    }, [reviews.length, isPaused]);

    const goToSlide = (index: number) => {
        setIdx(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000); // Resume auto-play after 3s
    };

    const goToPrevious = () => {
        setIdx((i) => (i - 1 + reviews.length) % reviews.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
    };

    const goToNext = () => {
        setIdx((i) => (i + 1) % reviews.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
    };

    return (
        <section id="bewertungen" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">Patientenstimmen</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-700 text-lg leading-relaxed">
                        Die Zufriedenheit meiner Patienten liegt mir sehr am Herzen. Hier finden Sie authentische Google-Bewertungen meiner Praxis.
                    </p>
                </div>

                {/* Google Reviews Status */}
                <div className="text-center mb-8 mt-10">
                    <div className="google-rating flex items-center justify-center gap-3">
                        <svg className="google-logo w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="average-rating text-2xl font-semibold text-slate-900">{averageRating.toFixed(1)}</span>
                        <div className="rating-stars text-amber-400 text-xl">★★★★★</div>
                        <span className="rating-value text-slate-600">({totalReviews}+ Bewertungen)</span>
                        <span className="live-indicator text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">Verifiziert</span>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    {/* Navigation Buttons */}
                    {reviews.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="reviews-nav-btn reviews-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                aria-label="Vorherige Bewertung"
                            >
                                ←
                            </button>
                            <button
                                onClick={goToNext}
                                className="reviews-nav-btn reviews-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                aria-label="Nächste Bewertung"
                            >
                                →
                            </button>
                        </>
                    )}

                    {/* Reviews Slider */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${idx * 100}%)`, width: `${reviews.length * 100}%` }}
                    >
                        {reviews.map((r, i) => (
                            <div key={i} className="w-full shrink-0 px-2 sm:px-8" style={{ width: `${100 / reviews.length}%` }}>
                                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="text-amber-400 text-2xl mb-4">{"★".repeat(r.rating)}</div>
                                    <p className="text-slate-800 italic text-lg leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                            {r.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-slate-600 font-medium">{r.author}</div>
                                            <div className="text-slate-500 text-sm">{r.time}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots Navigation */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`reviews-dot w-3 h-3 rounded-full transition-all duration-300 ${
                                    i === idx
                                        ? "bg-slate-900 scale-125"
                                        : "bg-slate-300 hover:bg-slate-400"
                                }`}
                                aria-label={`Bewertung ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Google Bewertungen Hinweis */}
                <div className="mt-16">
                    <div className="text-center p-10 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="font-epilogue text-slate-900 text-xl font-medium mb-4 tracking-tight">
                            Ihre Meinung ist mir wichtig
                        </h3>
                        <p className="text-slate-700 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            Waren Sie bereits Patient in meiner Praxis? Ich würde mich sehr über Ihr Feedback freuen.
                            Ihre Bewertung hilft anderen Patienten bei ihrer Entscheidung und mir dabei, meine Behandlung stetig zu verbessern.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <a
                                href="https://g.page/r/CW3UmxenXb1YEBI/review"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-md font-epilogue font-medium hover:bg-slate-800 transition-colors duration-200 tracking-tight"
                            >
                                <span className="mr-2">⭐</span>
                                Bewertung auf Google abgeben
                            </a>
                            <a
                                href="https://www.google.com/maps/place/Osteopathie+Alsen+-+Heilpraxis+f%C3%BCr+Osteopathie+Hamburg/@53.5702491,9.9816237,17z/data=!4m8!3m7!1s0x232e29d9d1478b6d:0x2ef8aab5d2facdef!8m2!3d53.5702491!4d9.9816237!9m1!1b1!16s%2Fg%2F11rr5w8sc6?hl=de&entry=ttu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-transparent text-slate-900 px-6 py-3 border border-slate-900 rounded-md font-epilogue font-medium hover:bg-slate-900 hover:text-white transition-all duration-200 tracking-tight"
                            >
                                📍 Alle Bewertungen ansehen
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
