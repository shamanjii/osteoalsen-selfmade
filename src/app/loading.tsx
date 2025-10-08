export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="mb-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-slate-900 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-semibold text-slate-900 mb-2 font-epilogue">
          Lädt...
        </h2>
        <p className="text-slate-600">
          Einen Moment bitte
        </p>
      </div>
    </div>
  );
}
