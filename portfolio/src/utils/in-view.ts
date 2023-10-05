type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;

export interface InViewOptions {
  root?: Element | Document;
  rootMargin?: string;
  amount?: "any" | "all" | number;
}

export default function inView(
  element: Element,
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  { root, rootMargin, amount = "any" }: InViewOptions = {}
) {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const active = new WeakMap<
    Element,
    (entry: IntersectionObserverEntry) => void
  >();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === Boolean(active.get(entry.target))) return;
        const onEnd = active.get(entry.target);

        if (entry.isIntersecting) {
          const newOnEnd = onStart(entry);
          if (newOnEnd) active.set(entry.target, newOnEnd);
        } else if (onEnd) {
          onEnd(entry);
          active.delete(entry.target);
        }
      });
    },
    {
      root,
      rootMargin,
      threshold:
        typeof amount === "number"
          ? amount
          : {
              any: 0,
              all: 1,
            }[amount],
    }
  );

  observer.observe(element);

  return () => observer.disconnect();
}
