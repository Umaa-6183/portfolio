import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function useScrollAnimationMulti(count, threshold = 0.1) {
  const refs = Array.from({ length: count }, () => useRef(null));
  const [visible, setVisible] = useState(Array(count).fill(false));
  useEffect(() => {
    const observers = refs.map((ref, i) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.unobserve(ref.current);
          }
        },
        { threshold }
      );
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);
  return [refs, visible];
}
