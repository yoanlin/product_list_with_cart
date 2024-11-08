import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [query]);

  return matches;
}
