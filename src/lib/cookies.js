const DAY_IN_SECONDS = 24 * 60 * 60;

export const ADMIN_SESSION_COOKIE = 'admin-session';

const resolveCookieDomain = () => {
  if (process.env.ADMIN_COOKIE_DOMAIN) {
    return process.env.ADMIN_COOKIE_DOMAIN;
  }

  if (process.env.NODE_ENV === 'production') {
    return 'bloom-bi.it';
  }

  return undefined;
};

export const getAdminSessionCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: DAY_IN_SECONDS,
  path: '/',
  domain: resolveCookieDomain(),
});

