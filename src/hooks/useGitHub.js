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
  const [privateRepoCount, setPrivateRepoCount] = useState(0);
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
      setPrivateRepoCount(githubData.privateRepoCount);

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
      setPrivateRepoCount(0);
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
        privateRepos: privateRepoCount,
        followers: user.followers,
        following: user.following,
        stars: repos.reduce((acc, repo) => acc + (repo.stars || 0), 0),
      }
    : {
        repos: repos.length,
        privateRepos: privateRepoCount,
        followers: 0,
        following: 0,
        stars: repos.reduce((acc, repo) => acc + (repo.stars || 0), 0),
      };

  return { repos, user, stats, contributions, loading, error, refetch: load, username: USERNAME };
}
