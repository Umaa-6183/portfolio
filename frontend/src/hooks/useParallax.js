import { useEffect, useRef } from 'react';

/**
 * Custom hook for parallax scroll effects
 * @param {number} speed - Parallax speed multiplier (0.5 = half speed, 2 = double speed)
 * @param {string} direction - 'vertical' or 'horizontal'
 */
export function useParallax(speed = 0.5, direction = 'vertical') {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;

      // Calculate when element enters viewport
      const windowHeight = window.innerHeight;
      const scrollProgress = (scrolled + windowHeight - elementTop) / (windowHeight + elementHeight);

      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const movement = (scrolled - elementTop) * speed;

        if (direction === 'vertical') {
          element.style.transform = `translate3d(0, ${movement}px, 0)`;
        } else {
          element.style.transform = `translate3d(${movement}px, 0, 0)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return elementRef;
}

/**
 * Custom hook for 3D tilt effect on mouse move
 */
export function use3DTilt(maxTilt = 15) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return elementRef;
}

/**
 * Custom hook for scroll-triggered reveal animations
 */
export function useScrollReveal(threshold = 0.2) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return elementRef;
}
