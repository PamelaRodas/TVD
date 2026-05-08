import { useState, useEffect } from 'react';

export default function StatsWidget() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('siteStats');
    return saved
      ? JSON.parse(saved)
      : {
          visits: 1,
          favorites: 0,
          timeOnSite: 0,
          lastVisit: new Date().toLocaleDateString(),
        };
  });

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Update visits
    const newStats = { ...stats, visits: stats.visits + 1, lastVisit: new Date().toLocaleDateString() };

    // Get favorite count
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const fav = JSON.parse(favorites);
      newStats.favorites = (fav.quotes?.length || 0) + (fav.photos?.length || 0) + (fav.tracks?.length || 0);
    }

    setStats(newStats);
    localStorage.setItem('siteStats', JSON.stringify(newStats));

    // Track time on site
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
      newStats.timeOnSite = (newStats.timeOnSite || 0) + 1;
      localStorage.setItem('siteStats', JSON.stringify(newStats));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div className="stats-widget">
      <div className="stat-item">
        <div className="stat-label">visits</div>
        <div className="stat-value">{stats.visits}</div>
        <div className="stat-icon">✦</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">saved</div>
        <div className="stat-value">{stats.favorites || 0}</div>
        <div className="stat-icon">♡</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">time here</div>
        <div className="stat-value">{formatTime(timeElapsed)}</div>
        <div className="stat-icon">⏳</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">last visit</div>
        <div className="stat-value-small">{stats.lastVisit}</div>
        <div className="stat-icon">🌙</div>
      </div>
    </div>
  );
}
