import { useEffect, useState } from "react";

export default function useInterceptionObserver(
  id: string,
  {
    root = null,
    rootMargin = "0px",
    threshold = 0,
  }: IntersectionObserverInit = {}
) {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFlag(entry.isIntersecting);
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id]);

  return flag;
}
