import { useCallback, useEffect, useState } from 'react';
import { featuredProjects } from '../config/site';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || '';

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  return res.json();
}

function mapRepo(repo) {
  const topics = (repo.topics || []).map((t) => t.toLowerCase());
  let category = 'other';
  if (topics.some((t) => t.includes('react'))) category = 'react';
  else if (topics.some((t) => t.includes('node'))) category = 'node';
  else if (topics.length >= 2) category = 'fullstack';

  return {
    id: String(repo.id),
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    description: repo.description || 'Open-source project on GitHub.',
    tech: (repo.topics?.length ? repo.topics.slice(0, 4) : [repo.language].filter(Boolean)) || [
      'JavaScript',
    ],
    thumbnail: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    liveUrl: repo.homepage || '#',
    githubUrl: repo.html_url,
    topics: [category, ...topics],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    fromGitHub: true,
  };
}

export function useGitHub() {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(!!USERNAME);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    // Always use the curated projects for the portfolio grid
    setRepos(featuredProjects);

    if (!USERNAME) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await fetchJson(`https://api.github.com/users/${USERNAME}`);
      setUser(userData);

      try {
        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
        );
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          // API returns { contributions: [ { date, count, level }, ... ] }
          const days = contribData.contributions || [];
          setContributions(days);
        } else {
          // Fallback to deno API
          const fallbackRes = await fetch(
            `https://github-contributions-api.deno.dev/${USERNAME}.json`
          );
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            setContributions(fallbackData.contributions || []);
          }
        }
      } catch {
        setContributions([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = user
    ? {
        repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        stars: repos.reduce((acc, r) => acc + (r.stars || 0), 0),
      }
    : { repos: 12, followers: 48, following: 32, stars: 128 };

  return { repos, user, stats, contributions, loading, error, refetch: load, username: USERNAME };
}
