export default function BehandlungenLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumbs Skeleton */}
      <div className="container mx-auto px-4 py-4">
        <div className="h-4 w-48 bg-slate-200 rounded animate-pulse"></div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="h-8 w-32 bg-slate-200 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 w-full bg-slate-200 rounded mb-6 animate-pulse"></div>
            <div className="h-6 w-3/4 bg-slate-200 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-6">
            <div className="h-8 w-2/3 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
