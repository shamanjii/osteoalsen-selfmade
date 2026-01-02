import { fallbackReviews } from '@/data/fallbackReviews';

/**
 * ReviewsStructuredData Component
 *
 * IMPORTANT: This component outputs ONLY individual Review objects.
 * The AggregateRating is handled by LocalBusinessStructuredData in layout.tsx
 * to avoid duplicate AggregateRating errors in Google Search Console.
 *
 * Each Review references the main business entity via itemReviewed.
 */

export default function ReviewsStructuredData() {
  // Output individual reviews as separate structured data objects
  const reviews = fallbackReviews.slice(0, 10).map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "@id": "https://www.osteoalsen.de/#organization",
      "name": "Osteopathie Alsen - Heilpraxis für Osteopathie Hamburg"
    },
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
  }));

  return (
    <>
      {reviews.map((review, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(review) }}
        />
      ))}
    </>
  );
}