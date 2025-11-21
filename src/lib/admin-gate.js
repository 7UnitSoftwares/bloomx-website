export const ADMIN_GATE_COOKIE = 'bloom-admin-gate';
export const ADMIN_GATE_MAX_AGE = 60 * 60 * 6; // 6 hours

const EMBEDDED_FALLBACK_CODE = 'bloom-team-2025';

export function getAdminGateCode() {
  return process.env.ADMIN_ACCESS_CODE?.trim() || EMBEDDED_FALLBACK_CODE;
}

export function isAdminGateEnabled() {
  return Boolean(getAdminGateCode());
}

export function verifyAdminGateCode(code) {
  const expected = getAdminGateCode();
  if (!expected || !code) {
    return false;
  }
  return expected === code.trim();
}

export function isAdminGateCookieValid(cookieValue) {
  if (!cookieValue) {
    return false;
  }

  const expected = getAdminGateCode();
  if (!expected) {
    return true;
  }

  return cookieValue === expected;
}

