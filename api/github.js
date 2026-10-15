const GITHUB_API = 'https://api.github.com';

async function githubFetch(path) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Jiregna-Dereje-Portfolio',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = ['Bearer', process.env.GITHUB_TOKEN].join(' ');
  }

  const response = await fetch(`${GITHUB_API}${path}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API: ${response.status}`);
  }
  return response.json();
}

export default async function handler(req, res) {
  const username = String(req.query.username || 'JDjire').trim();

  if (!/^[a-zA-Z0-9-]+$/.test(username)) {
    return res.status(400).json({ error: 'Invalid GitHub username.' });
  }

  try {
    const user = await githubFetch(
      process.env.GITHUB_TOKEN ? '/user' : `/users/${username}`
    );
    const publicRepos = await githubFetch(
      `/users/${username}/repos?per_page=100`
    );

    return res.status(200).json({
      user: {
        html_url: user.html_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      totalStars: publicRepos.reduce(
        (total, repo) => total + (repo.stargazers_count || 0),
        0
      ),
    });
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}
