"use client";
import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { fallbackReviews, reviewsStats, type Review } from "@/data/fallbackReviews";
import ReviewsStructuredData from "@/components/ReviewsStructuredData";

type LegacyReview = {
    text: string;
    author: string;
    rating: number;
    time: string;
    profilePhoto?: string;
    authorUrl?: string;
};

// Convert fallback reviews to legacy format for display
const convertToLegacyFormat = (reviews: Review[]): LegacyReview[] => {
    return reviews.slice(0, 8).map(review => ({
        text: review.text,
        author: review.author,
        rating: review.rating,
        time: review.date,
        profilePhoto: undefined
    }));
};

const Reviews = memo(function Reviews() {
    const [showAll, setShowAll] = useState(false);
    const [isLiveData, setIsLiveData] = useState(false);
    const [liveReviews, setLiveReviews] = useState<LegacyReview[]>([]);
    const [liveStats, setLiveStats] = useState<{ averageRating: number; totalReviews: number } | null>(null);

    // Fetch live Google reviews on mount
    useEffect(() => {
        async function fetchGoogleReviews() {
            try {
                const response = await fetch('/api/google-reviews');
                const data = await response.json();

                if (data.success && data.reviews) {
                    // Convert Google reviews to legacy format
                    const convertedReviews = data.reviews.map((review: any) => ({
                        text: review.text,
                        author: review.author,
                        rating: review.rating,
                        time: review.date,
                        profilePhoto: review.profilePhoto,
                        authorUrl: review.authorUrl
                    }));

                    // Merge live reviews with static fallbacks, removing duplicates
                    const staticReviews = convertToLegacyFormat(fallbackReviews);
                    const mergedReviews = [...convertedReviews];

                    // Add static reviews that don't exist in live reviews
                    staticReviews.forEach(staticReview => {
                        const isDuplicate = convertedReviews.some(
                            liveReview => liveReview.author === staticReview.author
                        );
                        if (!isDuplicate) {
                            mergedReviews.push(staticReview);
                        }
                    });

                    setLiveReviews(mergedReviews);
                    setLiveStats({
                        averageRating: data.averageRating,
                        totalReviews: data.totalReviews
                    });
                    setIsLiveData(true);

                    console.log('✅ Live Google Reviews geladen:', convertedReviews.length);
                    console.log('📊 Total Reviews (Live + Static):', mergedReviews.length);
                }
            } catch (error) {
                console.warn('⚠️ Fallback zu statischen Reviews:', error);
                // Fallback to static reviews (already set below)
            }
        }

        fetchGoogleReviews();
    }, []);

    // Use live data if available, otherwise fallback to static data
    // Sort chronologically: newest first
    const allReviews = useMemo(() => {
        const reviews = isLiveData ? liveReviews : convertToLegacyFormat(fallbackReviews);

        // Sort by date (newest first)
        // Priority: Live reviews (from API) always at top, then by date string
        return reviews.sort((a, b) => {
            // Reviews from live API should come first (they have profilePhoto)
            const aIsLive = !!a.profilePhoto;
            const bIsLive = !!b.profilePhoto;

            if (aIsLive && !bIsLive) return -1;
            if (!aIsLive && bIsLive) return 1;

            // For the rest, sort by time string (newer dates first)
            return 0; // Keep original order within each group
        });
    }, [isLiveData, liveReviews]);

    const averageRating = useMemo(() => {
        return liveStats?.averageRating ?? reviewsStats.averageRating;
    }, [liveStats]);

    const totalReviews = useMemo(() => {
        return liveStats?.totalReviews ?? reviewsStats.totalReviews;
    }, [liveStats]);

    // Show first 12 reviews initially, then all when expanded
    const displayedReviews = useMemo(() => {
        return showAll ? allReviews : allReviews.slice(0, 12);
    }, [allReviews, showAll]);

    const toggleShowAll = useCallback(() => {
        setShowAll(prev => !prev);
    }, []);

    return (
        <>
            <ReviewsStructuredData />
            <section id="bewertungen" className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">Patientenstimmen</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-700 text-lg leading-relaxed">
                        Die Zufriedenheit meiner Patienten liegt mir sehr am Herzen. Hier finden Sie authentische Bewertungen aus meiner Google Business Präsenz.
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
                        <span className={`live-indicator text-xs px-2 py-1 rounded-full ml-2 ${isLiveData ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {isLiveData ? '🔄 Live von Google' : 'Verifiziert'}
                        </span>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {displayedReviews.map((review, i) => (
                        <div key={i} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            {/* Rating Stars */}
                            <div className="text-amber-400 text-xl mb-4" aria-label={`${review.rating} von 5 Sternen`}>
                                {"★".repeat(review.rating)}
                            </div>

                            {/* Review Text */}
                            {review.text && (
                                <blockquote className="text-slate-800 italic text-base leading-relaxed mb-4 line-clamp-4">
                                    &ldquo;{review.text}&rdquo;
                                </blockquote>
                            )}

                            {/* Author Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-slate-900 font-medium text-sm">{review.author}</div>
                                    <div className="text-slate-500 text-xs">{review.time}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More/Less Button */}
                {allReviews.length > 12 && (
                    <div className="text-center mb-8">
                        <button
                            onClick={toggleShowAll}
                            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            {showAll ? (
                                <>
                                    <span>Weniger anzeigen</span>
                                    <span>↑</span>
                                </>
                            ) : (
                                <>
                                    <span>Alle {allReviews.length} Bewertungen anzeigen</span>
                                    <span>↓</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

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
                                href="https://g.co/kgs/sHjcBZV"
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
        </>
    );
});

export default Reviews;
