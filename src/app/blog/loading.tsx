export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumbs Skeleton */}
      <div className="container mx-auto px-4 py-4">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="h-12 w-48 bg-slate-200 rounded mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 w-3/4 bg-slate-200 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Blog Grid Skeleton */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden"
              >
                {/* Image Skeleton */}
                <div className="h-48 bg-slate-200 animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
