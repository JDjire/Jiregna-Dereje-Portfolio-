import { useMemo } from 'react';
import { useGitHubContext } from '../../context/GitHubContext';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function levelColor(count, max) {
  if (!count || count === 0) return '#1b1f2e'; // empty
  const ratio = count / Math.max(max, 1);
  if (ratio < 0.25) return 'rgba(0,212,255,0.20)';
  if (ratio < 0.5)  return 'rgba(0,212,255,0.45)';
  if (ratio < 0.75) return 'rgba(0,212,255,0.70)';
  return '#00d4ff';
}

/** Build a full 52-week grid (Sun–Sat columns) anchored to today */
function buildGrid(contributions) {
  // contributions is [{date: "2025-06-15", count: N}, ...]
  // Build a map for fast lookup
  const map = {};
  let max = 0;
  for (const d of contributions) {
    const count = d.count ?? d.contributionCount ?? 0;
    map[d.date] = count;
    if (count > max) max = count;
  }

  // If no real data, generate placeholder
  const hasRealData = contributions.length > 0;
  if (!hasRealData) {
    const weeks = Array.from({ length: 53 }, () =>
      Array.from({ length: 7 }, () => ({
        date: null,
        count: Math.random() < 0.4 ? Math.floor(Math.random() * 8) : 0,
      }))
    );
    const allCounts = weeks.flat().map((c) => c.count);
    return { weeks, max: Math.max(...allCounts, 1), isPlaceholder: true };
  }

  // Anchor: go back 52 full weeks from today (Sunday-aligned)
  const today = new Date();
  // Find the most recent Sunday
  const dayOfWeek = today.getDay(); // 0=Sun
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek - 52 * 7);

  const weeks = [];
  let current = new Date(startDate);

  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const iso = current.toISOString().slice(0, 10);
      const count = map[iso] ?? 0;
      week.push({ date: iso, count });
      if (count > max) max = count;
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return { weeks, max: Math.max(max, 1), isPlaceholder: false };
}

/** Work out which weeks mark a new month so we can render month labels */
function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    // Use Sunday of this week
    const firstDay = week.find((d) => d.date);
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      labels.push({ weekIndex: wi, month });
      lastMonth = month;
    }
  });
  return labels;
}

export default function ContributionGraph() {
  const { contributions, loading, username } = useGitHubContext();

  const { weeks, max, isPlaceholder } = useMemo(
    () => buildGrid(contributions),
    [contributions]
  );

  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  const totalContributions = useMemo(
    () => weeks.flat().reduce((s, d) => s + d.count, 0),
    [weeks]
  );

  // Cell + gap sizes (in px) — big enough to be clearly visible
  const CELL = 13;
  const GAP  = 3;
  const STEP = CELL + GAP;

  const gridW = weeks.length * STEP - GAP;
  const gridH = 7 * STEP - GAP;

  return (
    <div className="glass-card p-5 sm:p-6 md:p-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 mb-5">
        <div>
          <h3 className="font-mono text-label-mono text-white uppercase tracking-widest">
            Contribution Activity
          </h3>
          {!loading && (
            <p className="font-mono text-xs text-primary mt-0.5">
              {isPlaceholder
                ? 'Sample data — add VITE_GITHUB_USERNAME to show live'
                : `${totalContributions.toLocaleString()} contributions in the last year`}
            </p>
          )}
        </div>
        {username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-primary hover:text-secondary transition-colors"
          >
            @{username}
          </a>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 font-mono text-primary text-sm animate-pulse">
          Loading contribution data…
        </div>
      ) : (
        <div className="overflow-x-auto filter-scroll pb-2">
          {/* Month labels row */}
          <div
            className="relative mb-1"
            style={{ width: gridW + 32, height: 16, marginLeft: 32 }}
          >
            {monthLabels.map(({ weekIndex, month }) => (
              <span
                key={`${month}-${weekIndex}`}
                className="absolute font-mono text-[10px] text-on-surface-variant"
                style={{ left: weekIndex * STEP }}
              >
                {MONTHS[month]}
              </span>
            ))}
          </div>

          {/* Day labels + grid */}
          <div className="flex gap-0" style={{ width: gridW + 32 }}>
            {/* Day-of-week labels */}
            <div
              className="flex flex-col shrink-0 mr-1"
              style={{ gap: GAP, width: 28 }}
            >
              {DAYS.map((day, i) => (
                <div
                  key={day}
                  className="font-mono text-[9px] text-on-surface-variant flex items-center"
                  style={{ height: CELL, opacity: i % 2 === 1 ? 1 : 0 }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Cells */}
            <div
              role="img"
              aria-label="GitHub contribution heatmap — last 12 months"
              className="flex"
              style={{ gap: GAP }}
            >
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((cell, di) => (
                    <div
                      key={`${wi}-${di}`}
                      title={cell.date ? `${cell.count} contributions on ${cell.date}` : ''}
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 3,
                        backgroundColor: levelColor(cell.count, max),
                        transition: 'background-color 0.2s',
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-4 font-mono text-[10px] text-on-surface-variant">
            <span>Less</span>
            {[0, 0.25, 0.5, 0.75, 1].map((r) => (
              <div
                key={r}
                aria-hidden
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 3,
                  backgroundColor: levelColor(r > 0 ? r * max : 0, max),
                  flexShrink: 0,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
}
