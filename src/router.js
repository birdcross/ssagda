import { useEffect, useState } from 'react';

export function useSimpleRouter() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }));

  useEffect(() => {
    const onPopState = () => setLocation({
      pathname: window.location.pathname,
      search: window.location.search,
    });
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setLocation({ pathname: window.location.pathname, search: window.location.search });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { ...location, navigate };
}
