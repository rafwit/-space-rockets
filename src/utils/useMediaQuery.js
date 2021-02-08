import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener(handler);
    return () => mediaMatch.removeEventListener(handler);
  });
  return matches;
}
