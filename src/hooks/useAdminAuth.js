"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Hook to verify admin authentication on client side
 * Prevents access to admin pages when using browser back button with cleared session
 */
export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Include cookies
          cache: 'no-store', // Prevent caching
        });

        if (!response.ok) {
          // Session invalid or expired
          router.replace('/admin/login');
          return;
        }

        const data = await response.json();
        if (!data.success || !data.user) {
          // No valid user
          router.replace('/admin/login');
          return;
        }
        
        // If user has temporary password and is not on change-password page, redirect
        if (data.user.passwordTemporary && pathname !== '/admin/change-password') {
          router.replace('/admin/change-password');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/admin/login');
      }
    };

    // Check auth on mount
    checkAuth();

    // Check auth on pageshow event (handles back/forward navigation)
    const handlePageshow = (event) => {
      // If page was loaded from cache (back/forward button)
      if (event.persisted) {
        checkAuth();
      }
    };

    window.addEventListener('pageshow', handlePageshow);

    // Also check on focus (when user switches back to tab)
    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('pageshow', handlePageshow);
      window.removeEventListener('focus', handleFocus);
    };
  }, [router, pathname]);
}

