import { createContext, useContext } from 'react';
import { useGitHub } from '../hooks/useGitHub';

const GitHubContext = createContext(null);

export function GitHubProvider({ children }) {
  const value = useGitHub();
  return <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>;
}

export function useGitHubContext() {
  const ctx = useContext(GitHubContext);
  if (!ctx) throw new Error('useGitHubContext must be used within GitHubProvider');
  return ctx;
}
