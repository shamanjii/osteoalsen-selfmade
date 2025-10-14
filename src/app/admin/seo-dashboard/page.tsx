'use client';

/**
 * SEO Monitoring Dashboard
 *
 * Real-time dashboard for monitoring:
 * - Google Search Console rankings
 * - PostHog analytics & conversions
 * - Technical SEO health
 * - Web Vitals performance
 * - Automated recommendations
 */

import { useEffect, useState } from 'react';

interface SEOHealthData {
  timestamp: string;
  summary: {
    overallScore: number;
    status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
    lastUpdated: string;
  };
  searchConsole?: {
    totalClicks: number;
    totalImpressions: number;
    averageCTR: number;
    averagePosition: number;
    topKeywords: Array<{
      keyword: string;
      position: number;
      clicks: number;
      impressions: number;
    }>;
  };
  analytics?: {
    totalPageViews: number;
    uniqueVisitors: number;
    conversionRate: number;
    appointmentBookings: number;
    topPages: Array<{
      path: string;
      views: number;
      avgTimeOnPage: number;
    }>;
  };
  technicalSEO: {
    issues: Array<{
      severity: 'high' | 'medium' | 'low';
      type: string;
      description: string;
    }>;
    checks: {
      hasRobotsTxt: boolean;
      hasSitemap: boolean;
      hasStructuredData: boolean;
      mobileOptimized: boolean;
      httpsEnabled: boolean;
    };
  };
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    recommendation: string;
    impact: string;
  }>;
}

export default function SEODashboard() {
  const [data, setData] = useState<SEOHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSEOHealth();
    // Refresh every 5 minutes
    const interval = setInterval(fetchSEOHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function fetchSEOHealth() {
    try {
      const response = await fetch('/api/seo-health');
      if (!response.ok) throw new Error('Failed to fetch SEO health data');
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading SEO Dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
            <h2 className="text-red-400 text-xl font-bold mb-2">Error</h2>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const statusColors = {
    excellent: 'from-green-500 to-emerald-600',
    good: 'from-blue-500 to-cyan-600',
    needs_improvement: 'from-yellow-500 to-orange-600',
    critical: 'from-red-500 to-rose-600',
  };

  const statusGradient = statusColors[data.summary.status];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            SEO Monitoring Dashboard
          </h1>
          <p className="text-slate-400">
            Real-time SEO health for osteoalsen.de
          </p>
        </div>

        {/* Overall Score */}
        <div className={`bg-gradient-to-br ${statusGradient} rounded-2xl p-8 text-white shadow-2xl`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall SEO Score</h2>
              <p className="text-white/80 capitalize">
                Status: {data.summary.status.replace('_', ' ')}
              </p>
            </div>
            <div className="text-6xl font-black">{data.summary.overallScore}</div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Search Console Metrics */}
          {data.searchConsole && (
            <>
              <MetricCard
                title="Total Clicks"
                value={data.searchConsole.totalClicks.toLocaleString()}
                subtitle="Last 30 days"
                icon="🎯"
              />
              <MetricCard
                title="Impressions"
                value={data.searchConsole.totalImpressions.toLocaleString()}
                subtitle="Search visibility"
                icon="👁️"
              />
              <MetricCard
                title="Avg. Position"
                value={data.searchConsole.averagePosition.toFixed(1)}
                subtitle="Google ranking"
                icon="📊"
                trend={data.searchConsole.averagePosition <= 10 ? 'good' : 'warning'}
              />
              <MetricCard
                title="CTR"
                value={`${(data.searchConsole.averageCTR * 100).toFixed(2)}%`}
                subtitle="Click-through rate"
                icon="🖱️"
                trend={data.searchConsole.averageCTR >= 0.03 ? 'good' : 'warning'}
              />
            </>
          )}

          {/* Analytics Metrics */}
          {data.analytics && (
            <>
              <MetricCard
                title="Page Views"
                value={data.analytics.totalPageViews.toLocaleString()}
                subtitle="Last 30 days"
                icon="📄"
              />
              <MetricCard
                title="Unique Visitors"
                value={data.analytics.uniqueVisitors.toLocaleString()}
                subtitle="Distinct users"
                icon="👥"
              />
              <MetricCard
                title="Conversion Rate"
                value={`${(data.analytics.conversionRate * 100).toFixed(2)}%`}
                subtitle="Booking rate"
                icon="🎉"
                trend={data.analytics.conversionRate >= 0.03 ? 'good' : 'warning'}
              />
              <MetricCard
                title="Bookings"
                value={data.analytics.appointmentBookings.toString()}
                subtitle="Appointments booked"
                icon="📅"
                trend="good"
              />
            </>
          )}
        </div>

        {/* Top Keywords */}
        {data.searchConsole && data.searchConsole.topKeywords.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Top Keywords</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-3 px-4 text-slate-400 font-semibold">Keyword</th>
                    <th className="py-3 px-4 text-slate-400 font-semibold text-right">Position</th>
                    <th className="py-3 px-4 text-slate-400 font-semibold text-right">Clicks</th>
                    <th className="py-3 px-4 text-slate-400 font-semibold text-right">Impressions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.searchConsole.topKeywords.map((kw, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-3 px-4 text-white font-medium">{kw.keyword}</td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm font-bold ${
                            kw.position <= 3
                              ? 'bg-green-500/20 text-green-400'
                              : kw.position <= 10
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          #{kw.position.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white text-right">{kw.clicks}</td>
                      <td className="py-3 px-4 text-slate-400 text-right">
                        {kw.impressions.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {data.recommendations.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Recommendations ({data.recommendations.length})
            </h2>
            <div className="space-y-4">
              {data.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high'
                      ? 'bg-red-500/10 border-red-500'
                      : rec.priority === 'medium'
                      ? 'bg-yellow-500/10 border-yellow-500'
                      : 'bg-blue-500/10 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white">{rec.category}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                        rec.priority === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : rec.priority === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-2">{rec.recommendation}</p>
                  <p className="text-sm text-slate-400 italic">Impact: {rec.impact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical SEO Checks */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Technical SEO Checks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(data.technicalSEO.checks).map(([key, value]) => (
              <div
                key={key}
                className={`p-4 rounded-lg ${
                  value ? 'bg-green-500/10 border border-green-500/50' : 'bg-red-500/10 border border-red-500/50'
                }`}
              >
                <div className="text-2xl mb-2">{value ? '✅' : '❌'}</div>
                <div className={`text-sm font-semibold ${value ? 'text-green-400' : 'text-red-400'}`}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  trend?: 'good' | 'warning' | 'bad';
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  const trendColors = {
    good: 'border-green-500/50 bg-green-500/5',
    warning: 'border-yellow-500/50 bg-yellow-500/5',
    bad: 'border-red-500/50 bg-red-500/5',
  };

  const borderColor = trend ? trendColors[trend] : 'border-slate-700 bg-slate-800/50';

  return (
    <div className={`backdrop-blur rounded-xl p-6 border ${borderColor}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {trend && (
          <span
            className={`text-xs px-2 py-1 rounded font-bold ${
              trend === 'good'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}
          >
            {trend === 'good' ? '↑' : '⚠️'}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm font-semibold mb-1">{title}</div>
      <div className="text-slate-500 text-xs">{subtitle}</div>
    </div>
  );
}
