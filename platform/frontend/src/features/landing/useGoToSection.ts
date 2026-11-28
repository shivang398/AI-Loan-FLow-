import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from './theme';

/** Scrolls to a landing-page section; from another page (e.g. the blog) it opens the landing page at that section. */
export function useGoToSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useCallback((id: string) => {
    if (pathname === '/') scrollToId(id);
    else navigate(`/#${id}`);
  }, [navigate, pathname]);
}
