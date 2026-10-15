import { useCallback, useEffect, useState } from 'react';
import { featuredProjects } from '../config/site';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME?.trim() || 'JDjire';
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error(`GitHub API: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export function useGitHub() {
  const [repos, setRepos] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [user, setUser] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(!!USERNAME);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRepos(featuredProjects);

    try {
      const githubData = await fetchJson(
        `/api/github?username=${encodeURIComponent(USERNAME)}`
      );
      setUser(githubData.user);
      setTotalStars(githubData.totalStars);

      try {
        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
        );
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          setContributions(contribData.contributions || []);
        } else {
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
      setTotalStars(0);
      setError(
        err.status === 403 ? 'GitHub API rate limit reached.' : err.message
      );
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
        stars: totalStars,
      }
    : {
        repos: repos.length,
        followers: 0,
        following: 0,
        stars: totalStars,
      };

  return { repos, user, stats, contributions, loading, error, refetch: load, username: USERNAME };
}
