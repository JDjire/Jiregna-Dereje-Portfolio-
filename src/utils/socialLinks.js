/**
 * Resolves the native-app deep-link URI for a given social web URL.
 * Returns null if no known scheme exists for that platform.
 */
function getAppScheme(webUrl) {
  // Instagram
  if (webUrl.includes('instagram.com')) {
    const username = webUrl.match(/instagram\.com\/([^/?#]+)/)?.[1];
    return username ? `instagram://user?username=${username}` : null;
  }
  // Twitter / X
  if (webUrl.includes('x.com') || webUrl.includes('twitter.com')) {
    const username = webUrl.match(/(?:x|twitter)\.com\/([^/?#]+)/)?.[1];
    return username ? `twitter://user?screen_name=${username}` : null;
  }
  // LinkedIn
  if (webUrl.includes('linkedin.com/in/')) {
    const slug = webUrl.match(/linkedin\.com\/in\/([^/?#]+)/)?.[1];
    return slug ? `linkedin://in/${slug}` : null;
  }
  // Telegram
  if (webUrl.includes('t.me/')) {
    const username = webUrl.match(/t\.me\/([^/?#]+)/)?.[1];
    return username ? `tg://resolve?domain=${username}` : null;
  }
  // GitHub — no reliable universal deep-link scheme; fall through to browser
  return null;
}

/** Returns true when running on a mobile / touch device. */
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Click handler for social-media anchor tags.
 *
 * Desktop  → opens the web URL in a new tab (relies on the element's
 *            `target="_blank"` attribute — this function does nothing extra).
 *
 * Mobile   → attempts to launch the native app via its URI scheme.
 *            If the app is not installed (the page stays visible after 1.5 s)
 *            it falls back to opening the web URL in a new tab.
 *
 * Usage:
 *   <a href={url} target="_blank" rel="noopener noreferrer"
 *      onClick={(e) => handleSocialClick(e, url)}>…</a>
 */
export function handleSocialClick(e, webUrl) {
  if (!isMobile()) {
    // Desktop: let the browser handle target="_blank" normally.
    return;
  }

  const appScheme = getAppScheme(webUrl);
  if (!appScheme) {
    // No known app scheme → open web URL in new tab on mobile too.
    e.preventDefault();
    window.open(webUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // Prevent the default href from navigating away.
  e.preventDefault();

  // Listen for the page becoming hidden (app took over) to cancel fallback.
  let appOpened = false;
  const onVisibilityChange = () => {
    if (document.hidden) appOpened = true;
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Fallback: if app didn't open within 1.5 s, open the web URL.
  setTimeout(() => {
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (!appOpened) {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  }, 1500);

  // Attempt to open the native app.
  window.location.href = appScheme;
}
