'use client';

/**
 * Keyword Research & Content Strategy Dashboard
 *
 * Comprehensive keyword research tool combining:
 * - Content Gap Analysis (quick wins)
 * - Local SEO keywords
 * - Trending topics from Google Trends
 * - Actionable recommendations
 */

import { useEffect, useState } from 'react';

interface ContentGap {
  keyword: string;
  currentPosition: number;
  impressions: number;
  estimatedClicksIfTop10: number;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  suggestedActions: string[];
}

interface LocalKeyword {
  keyword: string;
  location: string;
  searchIntent: string;
  priority: number;
}

interface KeywordResearchData {
  contentGaps: ContentGap[];
  localKeywords: LocalKeyword[];
  trendingTopics: Array<{ keyword: string; queries: string[] }>;
  recommendations: string[];
}

export default function KeywordResearchDashboard() {
  const [data, setData] = useState<KeywordResearchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchKeywordResearch();
  }, []);

  async function fetchKeywordResearch() {
    try {
      setLoading(true);
      const response = await fetch('/api/keyword-research');
      if (!response.ok) throw new Error('Failed to fetch keyword research');

      const result = await response.json();
      setData(result.data);
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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Analyzing keywords...</div>
          <div className="text-slate-400 text-sm mt-2">This may take a few moments</div>
        </div>
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
            <button
              onClick={fetchKeywordResearch}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const highPriorityGaps = data.contentGaps.filter(g => g.priority === 'high');
  const mediumPriorityGaps = data.contentGaps.filter(g => g.priority === 'medium');
  const highPriorityLocalKeywords = data.localKeywords.filter(k => k.priority >= 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Keyword Research & Content Strategy
          </h1>
          <p className="text-slate-400">
            Data-driven insights to improve your SEO rankings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Content Gaps"
            value={data.contentGaps.length}
            subtitle="Quick win opportunities"
            icon="🎯"
            color="from-blue-500 to-cyan-600"
          />
          <StatCard
            title="High Priority"
            value={highPriorityGaps.length}
            subtitle="Immediate action needed"
            icon="🔥"
            color="from-red-500 to-orange-600"
          />
          <StatCard
            title="Local Keywords"
            value={highPriorityLocalKeywords.length}
            subtitle="High-value local terms"
            icon="📍"
            color="from-green-500 to-emerald-600"
          />
          <StatCard
            title="Trending Topics"
            value={data.trendingTopics.reduce((sum, t) => sum + t.queries.length, 0)}
            subtitle="Related queries"
            icon="📈"
            color="from-purple-500 to-pink-600"
          />
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            💡 Top Recommendations
          </h2>
          <ul className="space-y-2">
            {data.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">{idx + 1}.</span>
                <span className="text-slate-200">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Gaps - HIGH PRIORITY */}
        {highPriorityGaps.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-red-500/50">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              🔥 High Priority Content Gaps
              <span className="text-sm font-normal text-slate-400">
                ({highPriorityGaps.length} opportunities)
              </span>
            </h2>
            <p className="text-slate-300 mb-6">
              These keywords are on page 2 (position 11-20). Small optimizations can push them to page 1!
            </p>
            <div className="space-y-4">
              {highPriorityGaps.map((gap, idx) => (
                <ContentGapCard key={idx} gap={gap} />
              ))}
            </div>
          </div>
        )}

        {/* Content Gaps - MEDIUM PRIORITY */}
        {mediumPriorityGaps.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-yellow-500/50">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              ⚡ Medium Priority Content Gaps
              <span className="text-sm font-normal text-slate-400">
                ({mediumPriorityGaps.length} opportunities)
              </span>
            </h2>
            <div className="space-y-4">
              {mediumPriorityGaps.slice(0, 5).map((gap, idx) => (
                <ContentGapCard key={idx} gap={gap} />
              ))}
            </div>
          </div>
        )}

        {/* Local SEO Keywords */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-green-500/50">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            📍 High-Priority Local Keywords
          </h2>
          <p className="text-slate-300 mb-6">
            Target these location-specific keywords to dominate local search in Hamburg.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {highPriorityLocalKeywords.slice(0, 20).map((keyword, idx) => (
              <LocalKeywordCard key={idx} keyword={keyword} />
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        {data.trendingTopics.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/50">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              📈 Trending Topics & Related Queries
            </h2>
            <p className="text-slate-300 mb-6">
              Based on Google Trends - topics people are actively searching for.
            </p>
            <div className="space-y-6">
              {data.trendingTopics.map((topic, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-3">
                    🔍 {topic.keyword}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {topic.queries.map((query, qidx) => (
                      <span
                        key={qidx}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {query}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
        <span className="text-4xl font-black">{value}</span>
      </div>
      <div className="text-sm font-semibold mb-1">{title}</div>
      <div className="text-xs text-white/80">{subtitle}</div>
    </div>
  );
}

interface ContentGapCardProps {
  gap: ContentGap;
}

function ContentGapCard({ gap }: ContentGapCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{gap.keyword}</h3>
          <p className="text-sm text-slate-400">{gap.reason}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            gap.priority === 'high'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-yellow-500/20 text-yellow-400'
          }`}
        >
          {gap.priority.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
        <div>
          <div className="text-xs text-slate-500 mb-1">Position</div>
          <div className="text-lg font-bold text-yellow-400">
            #{gap.currentPosition.toFixed(1)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Impressions</div>
          <div className="text-lg font-bold text-blue-400">{gap.impressions}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Potential Clicks</div>
          <div className="text-lg font-bold text-green-400">+{gap.estimatedClicksIfTop10}</div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-400 text-sm hover:text-blue-300 transition"
      >
        {expanded ? '▼ Hide' : '▶ Show'} Action Steps ({gap.suggestedActions.length})
      </button>

      {expanded && (
        <ul className="mt-3 space-y-2 pl-4">
          {gap.suggestedActions.map((action, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-green-400 mt-0.5">✓</span>
              {action}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface LocalKeywordCardProps {
  keyword: LocalKeyword;
}

function LocalKeywordCard({ keyword }: LocalKeywordCardProps) {
  const intentColors = {
    informational: 'bg-blue-500/20 text-blue-400',
    navigational: 'bg-purple-500/20 text-purple-400',
    transactional: 'bg-green-500/20 text-green-400',
  };

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold text-white mb-1">{keyword.keyword}</div>
        <div className="text-xs text-slate-500">📍 {keyword.location}</div>
      </div>
      <span
        className={`px-2 py-1 rounded text-xs font-bold ${
          intentColors[keyword.searchIntent as keyof typeof intentColors]
        }`}
      >
        {keyword.searchIntent}
      </span>
    </div>
  );
}
