import { useCallback, useEffect, useState } from 'react';
import { featuredProjects } from '../config/site';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME?.trim() || 'JDjire';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN?.trim() || '';

async function fetchJson(url) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (TOKEN) headers.Authorization = ['Bearer', TOKEN].join(' ');

  const res = await fetch(url, { headers });
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
      const [userData, privateRepoData] = await Promise.all([
        fetchJson(TOKEN ? 'https://api.github.com/user' : `https://api.github.com/users/${USERNAME}`),
        TOKEN
          ? fetchJson(
              'https://api.github.com/user/repos?visibility=private&affiliation=owner&per_page=100'
            )
          : Promise.resolve([]),
      ]);
      setUser(userData);
      setPrivateRepoCount(
        userData.owned_private_repos ?? userData.total_private_repos ?? privateRepoData.length
      );

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
        err.status === 403
          ? 'GitHub API rate limit reached. Add VITE_GITHUB_TOKEN for live data.'
          : err.message
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
