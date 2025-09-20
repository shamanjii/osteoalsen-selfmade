import { fallbackReviews, reviewsStats } from '@/data/fallbackReviews';

interface ReviewsStructuredDataProps {
  businessName?: string;
  businessUrl?: string;
}

export default function ReviewsStructuredData({
  businessName = "Osteopathie Alsen - Heilpraxis für Osteopathie Hamburg",
  businessUrl = "https://www.osteoalsen.de"
}: ReviewsStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "url": businessUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviewsStats.averageRating,
      "reviewCount": reviewsStats.totalReviews,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": fallbackReviews.slice(0, 10).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.text,
      "datePublished": review.date.includes('.') ?
        new Date(review.date.split('.').reverse().join('-')).toISOString().split('T')[0] :
        new Date().toISOString().split('T')[0]
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}